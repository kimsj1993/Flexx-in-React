import { combineReducers } from 'redux';
import * as types from "./types";

const playersReducer = (state = {}, action) => {
	switch(action.type) {
		case types.ADD_PLAYER:
			return {
				...state,
				[action.payload.id]: action.payload
			};
		case types.UPDATE_PLAYER_CARDS_TOTAL:
			return {
				...state,
				[action.payload.id]: {
					...state[action.payload.id],
					cardsTotal: action.payload.cardsTotal
				}
			};
		case types.UPDATE_PLAYER_KEEPERS:
			return {
				...state,
				[action.payload.id]: {
					...state[action.payload.id],
					keepers: action.payload.cardIds
				}
			};
		default: return state;
	};
};

const turnReducer = (state = null, action) => {
	switch(action.type) {
		case types.BEGIN_PLAYER_TURN:
			return action.payload;
		default: return state;
	};
};

const playsRemainingReducer = (state = 0, action) => {
	switch(action.type) {
		case types.UPDATE_PLAYS_REMAINING:
			return action.payload;
		default: return state;
	};
};

const handReducer = (state = [], action) => {
	switch(action.type) {
		case types.UPDATE_HAND:
			return action.payload;
		default: return state;
	};
};

const tempHandReducer = (state = [], action) => {
	switch(action.type) {
		case types.UPDATE_TEMP_HAND:
			return action.payload;
		default: return state;
	};
};

const actionModeReducer = (state = false, action) => {
	switch(action.type) {
		case types.SET_ACTION_MODE:
			return action.payload;
		default: return state;
	};
};

const drawRuleReducer = (state = 1, action) => {
	switch(action.type) {
		case types.UPDATE_DRAW_RULE:
			return action.payload;
		default: return state;
	};
};

const playRuleReducer = (state = 1, action) => {
	switch(action.type) {
		case types.UPDATE_PLAY_RULE:
			return action.payload;
		default: return state;
	};
};

const handLimitReducer = (state = null, action) => {
	switch(action.type) {
		case types.UPDATE_HAND_LIMIT:
			return action.payload;
		default: return state;
	};
};

const keeperLimitReducer = (state = null, action) => {
	switch(action.type) {
		case types.UPDATE_KEEPER_LIMIT:
			return action.payload;
		default: return state;
	};
};

const rulesReducer = (state = [], action) => {
	switch(action.type) {
		case types.UPDATE_RULES:
			return action.payload.cardIds;
		case types.ADD_RULE:
			return state.slice().push(action.payload);
		case types.REMOVE_RULE:
			return state.filter(val => val != action.payload);
		default: return state;
	};
};

const goalsReducer = (state = [], action) => {
	switch(action.type) {
		case types.UPDATE_GOALS:
			return action.payload.cardIds;
		case types.ADD_GOAL:
			return state.slice().push(action.payload);
		case types.REMOVE_GOAL:
			return state.filter(val => val != action.payload);
		default: return state;
	};
};

const deckReducer = (state = 0, action) => {
	switch(action.type) {
		case types.UPDATE_DECK:
			return action.payload;
		default: return state;
	};
};

const discardsReducer = (state = [], action) => {
	switch(action.type) {
		case types.UPDATE_DISCARDS:
			return action.payload;
		default: return state;
	}
}

const reducer = combineReducers({
	players: playersReducer,
	turn: turnReducer,
	playsRemaing: playsRemainingReducer,
	hand: handReducer,
	tempHand: tempHandReducer,
	actionMode: actionModeReducer,
	drawRule: drawRuleReducer,
	playRule: playRuleReducer,
	handLimit: handLimitReducer,
	keeperLimit: keeperLimitReducer,
	rules: rulesReducer,
	goals: goalsReducer,
	deck: deckReducer,
	discards: discardsReducer
});