import * as types from './types';
import { createAction } from 'redux-actions';

const showDialog = createAction( types.SHOW_DIALOG );
const hideDialog = createAction( types.HIDE_DIALOG );

const updateMaxPlayersSelect = createAction(
	types.UPDATE_MAX_PLAYERS_SELECT,
	( { value } ) => value
);

const updateFreeJoinSwitch = createAction(
	types.UPDATE_FREE_JOIN_SWITCH,
	( { value } ) => value
);

const updatePasswordSwitch = createAction(
	types.UPDATE_PASSWORD_SWITCH,
	( { value } ) => value
);

const updatePasswordTextField = createAction(
	types.UPDATE_PASSWORD_TEXT_FIELD,
	( { value } ) => value
);

export {
	showDialog,
	hideDialog,
	updateMaxPlayersSelect,
	updateFreeJoinSwitch,
	updatePasswordSwitch,
	updatePasswordTextField
};