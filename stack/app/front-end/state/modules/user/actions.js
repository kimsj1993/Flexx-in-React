import * as types from "./types";
import { createAction } from 'redux-actions';

const login = createAction(
	types.LOG_IN,
	( { id } ) => id
);

const logout = createAction( types.LOG_OUT );

export {
	login,
	logout
};