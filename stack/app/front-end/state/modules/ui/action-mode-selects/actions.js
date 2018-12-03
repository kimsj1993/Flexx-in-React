import * as types from './types';
import { createAction } from 'redux-actions';

const addSelect = createAction( 
	types.ADD_SELECT,
	( { kind, cardType, collection, self, optional, index, count, mapFrom, mapKind } ) =>
		( { kind, cardType, collection, self, optional, index, count, mapFrom, mapKind } )
);

const clearSelects = createAction( types.CLEAR_SELECTS );

const addSelection = createAction(
	types.ADD_SELECTION,
	( { selection, index } ) => ( { selection, index } )
);

const removeSelection = createAction(
	types.REMOVE_SELECTION,
	( { selection, index } ) => ( { selection, index } )
);

export {
	addSelect,
	clearSelects,
	addSelection,
	removeSelection
};