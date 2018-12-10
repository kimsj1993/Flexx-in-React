import * as types from './types';
import { createAction } from 'redux-actions';

const showDialog = createAction( 
	types.SHOW_DIALOG,
	( { winnerId } ) => ( { winnerId } )
);

const hideDialog = createAction( types.HIDE_DIALOG );

export {
	showDialog,
	hideDialog
};