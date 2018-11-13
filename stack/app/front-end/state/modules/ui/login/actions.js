import * as types from './types';

const updateLoginForm = value => ( {
	type: types.UPDATE_LOGIN_FORM,
	payload: value
} );

export {
	updateLoginForm
};