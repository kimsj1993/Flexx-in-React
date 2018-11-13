import { combineReducers } from 'redux';

import { default as login } from './login';
import { default as gameInfoTab } from './game-info-tab';

const reducer = combineReducers( {
	login,
	gameInfoTab
} );

export default reducer;