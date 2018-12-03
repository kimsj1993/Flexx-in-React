import * as types from './types';
import { createAction } from 'redux-actions';

const showDialog = createAction( types.SHOW_DIALOG );
const hideDialog = createAction( types.HIDE_DIALOG );

const selectKeeper = createAction(
	types.SELECT_KEEPER,
	( { cardId } ) => cardId
);

const deselectKeeper = createAction(
	types.DESELECT_KEEPER,
	( { cardId } ) => cardId
);

const selectHand = createAction(
	types.SELECT_HAND,
	( { cardId } ) => cardId
);

const deselectHand = createAction(
	types.DESELECT_HAND,
	( { cardId } ) => cardId
);

export {
	showDialog,
	hideDialog,
	selectKeeper,
	deselectKeeper,
	selectHand,
	deselectHand
};