from sqlalchemy import util, exc, orm
from sqlalchemy.ext import associationproxy
from sqlalchemy.sql.operators import ColumnOperators

# https://stackoverflow.com/a/43296108
def aug_association_proxy(target_collection, attr, **kw):
    return AugAssociationProxy(target_collection, attr, **kw)


class AugAssociationProxy(associationproxy.AssociationProxy):
    def _as_instance(self, class_):
        try:
            return class_.__dict__[self.key + "_inst"]
        except KeyError:
            owner = self._calc_owner(class_)
            if owner is not None:
                result = AugAssociationProxyInstance.for_proxy(self, owner)
                setattr(class_, self.key + "_inst", result)
                return result
            else:
                return None


class AugAssociationProxyInstance(associationproxy.AssociationProxyInstance):
    """AssociationProxy class where creator() is a function
    (parent, value) -> obj, where `parent` is the parent instance,
    `value` is the child instance that is added to the proxy object,
    and `obj` is the object that will reside in the proxy's collection

    For dict classes, the function signature is (parent, key, value) -> obj.
    """
    @classmethod
    def for_proxy(cls, parent, owning_class):
        target_collection = parent.target_collection
        value_attr = parent.value_attr
        prop = orm.class_mapper(owning_class).\
            get_property(target_collection)
        target_class = prop.mapper.class_

        target_assoc = cls._cls_unwrap_target_assoc_proxy(
            target_class, value_attr)
        if target_assoc is not None:
            return AugObjectAssociationProxyInstance(
                parent, owning_class, target_class, value_attr
            )

        is_object = getattr(target_class, value_attr).impl.uses_objects
        if is_object:
            return AugObjectAssociationProxyInstance(
                parent, owning_class, target_class, value_attr
            )
        else:
            return AugColumnAssociationProxyInstance(
                parent, owning_class, target_class, value_attr
            )

    def _new(self, lazy_collection):
        creator = self.parent.creator if self.parent.creator else \
            self.target_class
        collection_class = util.duck_type_collection(lazy_collection())

        if self.parent.proxy_factory:
            return collection_class, self.parent.proxy_factory(
                lazy_collection, creator, self.value_attr, self)

        if self.parent.getset_factory:
            getter, setter = self.parent.getset_factory(
                collection_class, self)
        else:
            getter, setter = self.parent._default_getset(collection_class)

        if collection_class is list:
            return collection_class, AugAssociationList(
                lazy_collection, creator, getter, setter, self)
        elif collection_class is dict:
            return collection_class, AugAssociationDict(
                lazy_collection, creator, getter, setter, self)
        elif collection_class is set:
            return collection_class, AugAssociationSet(
                lazy_collection, creator, getter, setter, self)
        else:
            raise exc.ArgumentError(
                'could not guess which interface to use for '
                'collection_class "%s" backing "%s"; specify a '
                'proxy_factory and proxy_bulk_set manually' %
                (self.collection_class.__name__, self.target_collection))



class AugAssociationList(associationproxy._AssociationList):
    def _create(self, value):
        return self.creator(self.lazy_collection.parent, value)


class AugAssociationDict(associationproxy._AssociationDict):
    def _create(self, key, value):
        return self.creator(self.lazy_collection.parent, key, value)


class AugAssociationSet(associationproxy._AssociationSet):
    def _create(self, value):
        return self.creator(self.lazy_collection.parent, value)


class AugObjectAssociationProxyInstance(AugAssociationProxyInstance):
    """an :class:`.AssociationProxyInstance` that has an object as a target.
    """
    _target_is_object = True

    def contains(self, obj):
        """Produce a proxied 'contains' expression using EXISTS.
        This expression will be a composed product
        using the :meth:`.RelationshipProperty.Comparator.any`
        , :meth:`.RelationshipProperty.Comparator.has`,
        and/or :meth:`.RelationshipProperty.Comparator.contains`
        operators of the underlying proxied attributes.
        """

        target_assoc = self._unwrap_target_assoc_proxy
        if target_assoc is not None:
            return self._comparator._criterion_exists(
                target_assoc.contains(obj)
                if not target_assoc.scalar else target_assoc == obj
            )
        elif self._target_is_object and self.scalar and \
                not self._value_is_scalar:
            return self._comparator.has(
                getattr(self.target_class, self.value_attr).contains(obj)
            )
        elif self._target_is_object and self.scalar and \
                self._value_is_scalar:
            raise exc.InvalidRequestError(
                "contains() doesn't apply to a scalar object endpoint; use ==")
        else:

            return self._comparator._criterion_exists(**{self.value_attr: obj})

    def __eq__(self, obj):
        # note the has() here will fail for collections; eq_()
        # is only allowed with a scalar.
        if obj is None:
            return or_(
                self._comparator.has(**{self.value_attr: obj}),
                self._comparator == None
            )
        else:
            return self._comparator.has(**{self.value_attr: obj})

    def __ne__(self, obj):
        # note the has() here will fail for collections; eq_()
        # is only allowed with a scalar.
        return self._comparator.has(
            getattr(self.target_class, self.value_attr) != obj)


class AugColumnAssociationProxyInstance(ColumnOperators, AugAssociationProxyInstance):
    """an :class:`.AssociationProxyInstance` that has a database column as a
    target.
    """
    _target_is_object = False

    def __eq__(self, other):
        # special case "is None" to check for no related row as well
        expr = self._criterion_exists(
            self.remote_attr.operate(operator.eq, other)
        )
        if other is None:
            return or_(
                expr, self._comparator == None
            )
        else:
            return expr

    def operate(self, op, *other, **kwargs):
        return self._criterion_exists(
            self.remote_attr.operate(op, *other, **kwargs)
        )


class ModelFactoryRegistry:
    def __init__(self):
        self.factories = {}
        self.depends = {}

    def register(self, clsname, *requires):
        def decorate(func):
            if clsname in self.factories:
                raise ValueError("Factory for '%s' is already registered!" % clsname)

            if requires:
                self.depends[clsname] = requires

            self.factories[clsname] = func

            return func

        return decorate

    def manufacture(self, base):
        to_manufacture = list(self.factories)
        manufactured = {}
        for clsname in to_manufacture:
            self._manufacture_recursive(base, manufactured, clsname)

        return manufactured

    def _manufacture_recursive(self, base, manufactured, clsname):
        if clsname in manufactured:
            return

        deps = self.depends.get(clsname, ())
        for dep in deps:
            self._manufacture_recursive(base, manufactured, dep)

        factory = self.factories[clsname]
        manufactured[clsname] = factory(base, *(manufactured[k] for k in deps))
