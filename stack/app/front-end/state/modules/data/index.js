import { combineReducers } from 'redux';

import { default as cards } from './cards';
import { default as game } from './game';
import { default as hand } from './hand';
import { default as lobby } from './lobby';
import { default as players } from './players';
import { default as table } from './table';
import { default as user } from './user';
import { default as users } from './users';

const reducer = combineReducers( {
	cards,
	game,
	hand,
	lobby,
	players,
	table,
	user,
	users
} );

export default reducer;