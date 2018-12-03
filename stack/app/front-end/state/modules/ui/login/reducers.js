import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

const value = (state = '', action) => {
	switch(action.type) {
		case types.UPDATE_LOGIN_FORM:
			return action.payload;
		default: return state;
	};
};

const loading = handleActions(
	{
		[ types.LOGIN_REQUEST ]: () => true,

		[ types.LOGIN_SUCCESS ]: () => false,

		[ types.LOGIN_ERROR ]: () => false
	},

	false
);

const error = handleActions(
	{
		[ types.LOGIN_ERROR ]: ( state, { payload } ) => payload.response.message,

		[ types.LOGIN_REQUEST ]: () => null,

		[ types.UPDATE_LOGIN_FORM ]: () => null
	},

	null
);

const reducer = combineReducers( {
	value,
	loading,
	error
} );

export default reducer;