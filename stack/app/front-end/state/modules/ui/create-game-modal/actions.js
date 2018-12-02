import * as types from './types';
import { createAction } from 'redux-actions';
import { createApiAction } from '../../../utils/redux-api-middleware-utils';

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

const createGame = createApiAction(
	{
		endpoint: 'https://fluxx.d.calebj.io/api/games',
		method: 'POST',
		credentials: 'include',
		headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		},
		types: [
			types.CREATE_GAME_LOADING, types.HIDE_DIALOG, types.CREATE_GAME_ERROR
		]
	},
	( rsaa, { maxPlayers, freeJoin, hasPassword, password } ) => ( {
		body: JSON.stringify( {
			free_join: freeJoin,
			max_players: maxPlayers,
			password: hasPassword ? password : null
		} )
	} )
);

export {
	showDialog,
	hideDialog,
	updateMaxPlayersSelect,
	updateFreeJoinSwitch,
	updatePasswordSwitch,
	updatePasswordTextField,
	createGame
};