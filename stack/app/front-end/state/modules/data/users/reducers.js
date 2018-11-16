import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
    [userId]: {
		username: String,
		id: userId
    },
    ...
}
*/

const byId = handleActions(
	{
		[ types.ADD_USER ]: ( state, { payload } ) => ( {
			...state,
			[ payload.id ]: payload
		} ),

		[ types.REMOVE_USER ]: ( state, { payload } ) =>
			Object.keys( state ).reduce( ( newState, id ) => {
				return ( id == payload ) ? newState : { ...newState, [ id ]: { ...state[ id ] } };
			}, {} ),

		[ types.UPDATE_USER ]: ( state, { payload } ) =>
			Object.keys( state ).reduce( (newState, id ) => {
				return ( id == payload.id ) ?
					{ ...newState, [ id ]: { ...state[ id ], ...payload } } :
					{ ...newState, [ id ]: { ...state[ id ] }
			} ),

		[ types.CLEAR_USERS ]: () => {}
	},

	{} // initial state
);



const reducer = ( state = {}, action ) => {
	switch ( action.type ) {
		case types.UPDATE_USERS:
			return action.payload;
		case types.ADD_USER:
			return {
				...state,
				[action.payload.id]: action.payload
			};
		case types.REMOVE_USER:
			const { [action.payload]: value, ...rest } = state;
			return rest;
		default: return state;
	};
};

export default reducer;