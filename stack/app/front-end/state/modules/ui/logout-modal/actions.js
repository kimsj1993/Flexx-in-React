import * as types from './types';
import { createAction } from 'redux-actions';

const showDialog = createAction( types.SHOW_DIALOG );
const hideDialog = createAction( types.HIDE_DIALOG );

const logoutRequest = createAction( types.LOGOUT_REQUEST );
const logoutError = createAction( types.LOGOUT_ERROR );

export {
	showDialog,
	hideDialog,
	logoutRequest,
	logoutError
};