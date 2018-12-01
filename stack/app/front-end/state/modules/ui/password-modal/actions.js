import * as types from './types';
import { createAction } from 'redux-actions';

const updateTextField = createAction(
	types.UPDATE_TEXT_FIELD,
	( { value } ) => value
);

const clearTextField = createAction( types.CLEAR_TEXT_FIELD );

const inputError = createAction(
	types.INPUT_ERROR,
	( { errorText } ) => errorText
);

const clearError = createAction( types.CLEAR_ERROR );

const showModal = createAction( 
	types.SHOW_MODAL,
	( { id } ) => id
);

const hideModal = createAction( types.HIDE_MODAL );

export {
	updateTextField,
	clearTextField,
	inputError,
	clearError,
	showModal,
	hideModal
};