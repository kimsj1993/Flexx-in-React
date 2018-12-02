import { combineReducers } from 'redux';

import { default as login } from './login';
import { default as gameInfoTab } from './game-info-tab';
import { default as chat } from './chat';
import { default as lobby } from './lobby';
import { default as passwordModal } from './password-modal';
import { default as createGameModal } from './create-game-modal';
import { default as app } from './app';

const reducer = combineReducers( {
	login,
	gameInfoTab,
	chat,
	lobby,
	passwordModal,
	createGameModal,
	app
} );

export default reducer;