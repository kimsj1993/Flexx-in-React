import createCachedSelector from 're-reselect';

const getCardById = createCachedSelector(
	( state, id ) => state.data.cards.byId[ id ],
	result => result,
	( state, id ) => id
);

export {
	getCardById
};