import * as types from './types';
import { createAction } from 'redux-actions';

const addSelect = createAction( 
	types.ADD_SELECT,
	( { pick } ) =>
		( { pick } )
);

const clearSelects = createAction( types.CLEAR_SELECTS );

const addCardId = createAction(
	types.ADD_CARD_ID,
	( { id } ) => id
);

const clearCardId = createAction( types.CLEAR_CARD_ID );

const addSelection = createAction(
	types.ADD_SELECTION,
	( { selection, index } ) => ( { selection, index } )
);

const removeSelection = createAction(
	types.REMOVE_SELECTION,
	( { selection, index } ) => ( { selection, index } )
);

const showDialog = createAction( types.SHOW_DIALOG );

const hideDialog = createAction( types.HIDE_DIALOG );

export {
	addSelect,
	clearSelects,
	addCardId,
	clearCardId,
	addSelection,
	removeSelection,
	showDialog,
	hideDialog
};