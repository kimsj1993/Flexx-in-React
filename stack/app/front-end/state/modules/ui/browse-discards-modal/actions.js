import * as types from './types';
import { createAction } from 'redux-actions';

const showDialog = createAction( types.SHOW_DIALOG );
const hideDialog = createAction( types.HIDE_DIALOG );

const showDetails = createAction(
	types.SHOW_DETAILS,
	( { id } ) => id
);

const hideDetails = createAction( types.HIDE_DETAILS );

export {
	showDialog,
	hideDialog,
	showDetails,
	hideDetails
};