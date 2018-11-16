import createCachedSelector from 're-reselect';

// const getCardById = createCachedSelector(
// 	( state, id ) => state.data.cards.byId[ id ],
// 	result => result
// )(
// 	( state, id ) => id
// );

const getCardById = ( state, id ) => state.data.cards.byId[ id ];

export {
	getCardById
};