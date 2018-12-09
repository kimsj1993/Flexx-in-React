import * as actions from './actions';

const {
	addSelect,
	clearSelects,
	addCardId,
	clearCardId,
	addSelection,
	removeSelection
} = actions;

const initSelects = ( { picks, id } ) => dispatch => {
	dispatch( addCardId( { id } ) );
	picks.forEach( pick => dispatch( addSelect( { pick } ) ) );
};

const resetSelects = () => dispatch => {
	dispatch( clearCardId() );
	dispatch( clearSelects() );
};

const showDialog = ( { picks, id } ) => dispatch => {
	dispatch( initSelects( { picks, id } ) );
	dispatch( actions.showDialog() );
};

const hideDialog = () => dispatch => {
	dispatch( actions.hideDialog );
	dispatch( resetSelects() );
};

export {
	addSelect,
	clearSelects,
	addCardId,
	clearCardId,
	addSelection,
	removeSelection,
	initSelects,
	resetSelects,
	showDialog,
	hideDialog
};