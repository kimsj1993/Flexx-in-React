import createCachedSelector from 're-reselect';

// const getUserById = createCachedSelector(
// 	( state, id ) => state.data.users.byId[ id ],
// 	result => result
// )(
// 	( state, id ) => id
// );

const getUserById = ( state, id ) => state.data.users.byId[ id ];

export {
	getUserById
};