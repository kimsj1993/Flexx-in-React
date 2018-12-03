import * as types from './types';
import { createAction } from 'redux-actions';
import { createApiAction } from '../../../utils/redux-api-middleware-utils';

const updateTextField = createAction(
	types.UPDATE_TEXT_FIELD,
	( { value } ) => value
);

const clearTextField = createAction( types.CLEAR_TEXT_FIELD );

const showModal = createAction( 
	types.SHOW_MODAL,
	( { id } ) => id
);

const hideModal = createAction( types.HIDE_MODAL );

const joinGame = createApiAction(
	{
		endpoint: ( id, password ) => 
			'https://fluxx.d.calebj.io/api/games/' + id + '?join' + ( password ? '&password=' + password : '' ),
		method: 'POST',
		credentials: 'include',
		types: [
			types.JOIN_GAME_LOADING, types.HIDE_MODAL, types.JOIN_GAME_ERROR
		]
	},
	( rsaa, { id, password } ) => ( {
		endpoint: rsaa.endpoint( id, password )
	} )
);

export {
	updateTextField,
	clearTextField,
	showModal,
	hideModal,
	joinGame
};