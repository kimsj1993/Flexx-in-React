import * as types from './types';
import { createAction } from 'redux-actions';

const updateLoginForm = value => ( {
	type: types.UPDATE_LOGIN_FORM,
	payload: value
} );

export {
	updateLoginForm
};