import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	loading: Boolean,
	error: String || null
}
*/

const loading = handleActions(
	{
		[ types.APP_LOAD_REQUEST ]: () => true,

		[ types.APP_LOAD_SUCCESS ]: () => false,

		[ types.APP_LOAD_ERROR ]: () => false
	},

	false
);

const error = handleActions(
	{
		[ types.APP_LOAD_ERROR ]: ( state, { payload } ) => payload.message,

		[ types.APP_LOAD_REQUEST ]: () => null
	},

	null
);

const reducer = combineReducers( {
	loading,
	error
} );

export default reducer;