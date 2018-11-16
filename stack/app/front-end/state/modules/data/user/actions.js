import * as types from "./types";
import { createAction } from 'redux-actions';

const initUser = createAction(
	types.INIT_USER,
	( { id } ) => ( { id } )
);

const updateUser = createAction(
	types.UPDATE_USER,
	update => update
);

const clearUser = createAction( types.CLEAR_USER );

export {
	initUser,
	updateUser,
	clearUser
};