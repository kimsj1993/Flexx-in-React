import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";
import { gameTypes } from '../game';



const rules = handleActions(
	{
		[ types.ADD_RULE ]: ( state, { payload } ) => [ ...state, payload ],

		[ types.REMOVE_RULE ]: ( state, {payload } ) => state.filter( id => id != payload ),

		[ types.CLEAR_RULES ]: () => []
	},

	[] // initial state
);

const draw = handleActions(
	{
		[ types.UPDATE_DRAW_RULE ]: ( state, { payload } ) => payload
	},

	1 // initial state
);

const play = handleActions(
	{
		[ types.UPDATE_PLAY_RULE ]: ( state, { payload } ) => payload
	},

	1 // initial state
);

const handLimit = handleActions(
	{
		[ types.UPDATE_HAND_LIMIT ]: ( state, { payload } ) => payload,

		[ types.CLEAR_HAND_LIMIT ]: () => null
	},

	null // initial state
);

const keeperLimit = handleActions(
	{
		[ types.UPDATE_KEEPER_LIMIT ]: ( state, { payload } ) => payload,

		[ types.CLEAR_KEEPER_LIMIT ]: () => null
	},

	null // initial state
);

const goals = handleActions(
	{
		[ types.ADD_GOAL ]: ( state, { payload } ) => [ ...state, payload ],

		[ types.REMOVE_GOAL ]: ( state, {payload } ) => state.filter( id => id != payload ),

		[ types.CLEAR_GOALS ]: () => []
	},

	[] // initial state
);

const deck = handleActions(
	{
		[ types.UPDATE_DECK ]: ( state, { payload } ) => payload
	},

	0 // initial state
);

const discards = handleActions(
	{
		[ types.ADD_DISCARD ]: ( state, { payload } ) => [ ...state, payload ],

		[ types.REMOVE_DISCARD ]: ( state, {payload } ) => state.filter( id => id != payload ),

		[ types.CLEAR_DISCARDS ]: () => []
	},

	[] // initial state
);

const reducer = combineReducers( {
	rules,
	draw,
	play,
	handLimit,
	keeperLimit,
	goals,
	deck,
	discards
} );

export default reducer;