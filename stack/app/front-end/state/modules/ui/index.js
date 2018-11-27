import { combineReducers } from 'redux';

import { default as login } from './login';
import { default as gameInfoTab } from './game-info-tab';
import { default as chat } from './chat';

const reducer = combineReducers( {
	login,
	gameInfoTab,
	chat
} );

export default reducer;