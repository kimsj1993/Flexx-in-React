import { combineReducers } from "redux";
import * as types from "./types";
import { gameTypes } from '../game';

const rulesReducer = ( state = [], action ) => {
	switch ( action.type ) {
		case types.ADD_RULE:
			return [ ...state, action.payload ];
		case types.REMOVE_RULE:
			return state.filter( id => id != action.payload );
		case types.ADD_RULES:
			return [ ...state, action.payload ];
		case types.RESET_RULES:
			return [];
		case gameTypes.END_GAME:
			return [];
		case gameTypes.LEAVE_GAME:
			return [];
		default: return state;
	};
};

const drawRuleReducer = ( state = 1, action ) => {
	switch ( action.type ) {
		case types.UPDATE_DRAW_RULE:
			return action.payload;
		case types.RESET_RULES:
			return 1;
		case gameTypes.END_GAME:
			return 1;
		case gameTypes.LEAVE_GAME:
			return 1;
		default: return state;
	};
};

const playRuleReducer = ( state = 1, action ) => {
	switch ( action.type ) {
		case types.UPDATE_PLAY_RULE:
			return action.payload;
		case types.RESET_RULES:
			return 1;
		case gameTypes.END_GAME:
			return 1;
		case gameTypes.LEAVE_GAME:
			return 1;
		default: return state;
	};
};

const handLimitReducer = ( state = null, action ) => {
	switch ( action.type ) {
		case types.UPDATE_HAND_LIMIT:
			return action.payload;
		case types.RESET_RULES:
			return null;
		case gameTypes.END_GAME:
			return null;
		case gameTypes.LEAVE_GAME:
			return null;
		default: return state;
	};
};

const keeperLimitReducer = ( state = null, action ) => {
	switch ( action.type ) {
		case types.UPDATE_KEEPER_LIMIT:
			return action.payload;
		case types.RESET_RULES:
			return null;
		case gameTypes.END_GAME:
			return null;
		case gameTypes.LEAVE_GAME:
			return null;
		default: return state;
	};
};

const goalsReducer = ( state = [], action ) => {
	switch ( action.type ) {
		case types.ADD_GOAL:
			return [ ...state, action.payload ];
		case types.REMOVE_GOAL:
			return state.filter( id => id != action.payload );
		case types.ADD_GOALS:
			return [ ...state, action.payload ];
		case types.RESET_GOALS:
			return [];
		case gameTypes.END_GAME:
			return [];
		case gameTypes.LEAVE_GAME:
			return [];
		default: return state;
	};
};

const deckCountReducer = ( state = 0, action ) => {
	switch ( action.type ) {
		case types.UPDATE_DECK_COUNT:
			return action.payload;
		case gameTypes.END_GAME:
			return 0;
		case gameTypes.LEAVE_GAME:
			return 0;
		default: return state;
	};
};

const discardsReducer = ( state = [], action ) => {
	switch ( action.type ) {
		case types.UPDATE_DISCARD_PILE:
			return action.payload;
		case gameTypes.END_GAME:
			return [];
		case gameTypes.LEAVE_GAME:
			return [];
		default: return state;
	};
};

const reducer = combineReducers( {
	rules: rulesReducer,
	draw: drawRuleReducer,
	play: playRuleReducer,
	handLimit: handLimitReducer,
	keeperLimit: keeperLimitReducer,
	goals: goalsReducer,
	deckCount: deckCountReducer,
	discards: discardsReducer
} );

export default reducer;