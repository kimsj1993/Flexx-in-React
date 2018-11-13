import { combineReducers } from 'redux';

import { default as cards } from './cards';
import { default as game } from './game';
import { default as hand } from './hand';
import { default as lobby } from './lobby';
import { default as players } from './players';
import { default as room } from './room';
import { default as table } from './table';
import { default as turn } from './turn';
import { default as user } from './user';
import { default as users } from './users';

const reducer = combineReducers( {
	cards,
	game,
	hand,
	lobby,
	players,
	room,
	table,
	turn,
	user,
	users
} );

export default reducer;