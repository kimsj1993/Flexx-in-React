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
