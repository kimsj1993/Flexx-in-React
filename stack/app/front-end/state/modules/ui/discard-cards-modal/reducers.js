import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	show: Boolean,
	loading: Boolean,
	error: String || null,
	selectedKeepers: [ cardId ],
	selectedHand: [ cardId ]
}
*/

const show = handleActions(
	{
		[ types.SHOW_DIALOG ]: () => true,

		[ types.HIDE_DIALOG ]: () => false
	},

	false
);

const loading = handleActions(
	{
		[ types.DISCARD_CARDS_REQUEST ]: () => true,

		[ types.DISCARD_CARDS_SUCCESS ]: () => false,

		[ types.HIDE_DIALOG ]: () => false,

		[ types.DISCARD_CARDS_ERROR ]: () => false
	},

	false
);

const error = handleActions(
	{
		[ types.DISCARD_CARDS_ERROR ]: ( state, { payload } ) => payload,

		[ types.HIDE_DIALOG ]: () => null,

		[ types.DISCARD_CARDS_REQUEST ]: () => null,

		[ types.SELECT_KEEPER ]: () => null,

		[ types.DESELECT_KEEPER ]: () => null,

		[ types.SELECT_HAND ]: () => null,

		[ types.DESELECT_HAND ]: () => null,
	},

	null
);

const selectedKeepers = handleActions(
	{
		[ types.SELECT_KEEPER ]: ( state, { payload } ) => [
			...state,
			payload
		],

		[ types.DESELECT_KEEPER ]: ( state, { payload } ) => 
			state.filter( id => id != payload ),

		[ types.HIDE_DIALOG ]: () => []
	},

	[]
);

const selectedHand = handleActions(
	{
		[ types.SELECT_HAND ]: ( state, { payload } ) => [
			...state,
			payload
		],

		[ types.DESELECT_HAND ]: ( state, { payload } ) => 
			state.filter( id => id != payload ),

		[ types.HIDE_DIALOG ]: () => []
	},

	[]
);

const reducer = combineReducers( {
	show,
	loading,
	error,
	selectedKeepers,
	selectedHand
} );

export default reducer;