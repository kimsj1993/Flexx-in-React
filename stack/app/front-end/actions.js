import fetch from 'cross-fetch';
import { Router } from './routes'

// types

export const UPDATE_PLAYER_ID = 'UPDATE_PLAYER_ID';
export const ADD_USER_DATA = 'UPDATE_USER_DATA';
export const ADD_KEEPER_DATA = 'ADD_KEEPER_DATA';
export const ADD_GOAL_DATA = 'ADD_GOAL_DATA';
export const ADD_RULE_DATA = 'ADD_RULE_DATA';
export const ADD_ACTION_DATA = 'ADD_ACTION_DATA';
export const START_PLAYER_TURN = 'START_PLAYER_TURN';
export const END_PLAYER_TURN = 'END_PLAYER_TURN';
export const PLAYER_CAN_END_TURN = 'PLAYER_CAN_END_TURN';
export const PLAYER_CANNOT_END_TURN = 'PLAYER_CANNOT_END_TURN';
export const UPDATE_PLAYS_REMAINING = 'UPDATE_PLAYS_REMAINING';
export const UPDATE_HAND = 'UPDATE_HAND';
export const UPDATE_KEEPERS = 'UPDATE_KEEPERS';
export const ADD_OPPONENT = 'ADD_OPPONENT';
export const START_OPPONENT_TURN = 'START_OPPONENT_TURN';
export const END_OPPONENT_TURN = 'END_OPPONENT_TURN';
export const UPDATE_OPPONENT_PLAYS_REMAINING = 'UPDATE_OPPONENT_PLAYS_REMAINING';
export const UPDATE_OPPONENT_CARD_COUNT = 'UPDATE_OPPONENT_CARD_COUNT';
export const UPDATE_OPPONENT_KEEPERS = 'UPDATE_OPPONENT_KEEPERS';
export const UPDATE_DRAW_RULE = 'UPDATE_DRAW_RULE';
export const UPDATE_PLAY_RULE = 'UPDATE_PLAY_RULE';
export const UPDATE_KEEPER_LIMIT = 'UPDATE_KEEPER_LIMIT';
export const UPDATE_HAND_LIMIT = 'UPDATE_HAND_LIMIT';
export const UPDATE_ACTION_RULES = 'UPDATE_ACTION_RULES';
export const UPDATE_GAMEPLAY_RULES = 'UPDATE_GAMEPLAY_RULES';
export const UPDATE_BONUS_RULES = 'UPDATE_BONUS_RULES';
export const UPDATE_GOALS = 'UPDATE_GOALS';
export const UPDATE_DECK_COUNT = 'UPDATE_DECK_COUNT';
export const UPDATE_DISCARD_PILE = 'UPDATE_DISCARD_PILE';

export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM';
export const UPDATE_GAME_INFO_TAB = 'UPDATE_GAME_INFO_TAB';

// normal actions


// action creators

export const updatePlayerId = id => ({
	type: UPDATE_USER_DATA,
	payload: id
});

export const addUserData = data => ({
	type: ADD_USER_DATA,
	payload: data
});

export const addCardData = (type, data) => {
	switch (type) {
		case 'KEEPER':
			return {
				type: ADD_KEEPER_DATA,
				payload: data
			};
		case 'GOAL':
			return {
				type: ADD_GOAL_DATA,
				payload: data
			};
		case 'NEW_RULE':
			return {
				type: ADD_RULE_DATA,
				payload: data
			};
		case 'ACTION':
			return {
				type: ADD_ACTION_DATA,
				payload: data
			};
		default:
			break;
	};
};

export const startPlayerTurn = () => ({
	type: START_PLAYER_TURN
});

export const endPlayerTurn = () => ({
	type: END_PLAYER_TURN
});

export const playerCanEndTurn = () => ({
	type: PLAYER_CAN_END_TURN
});

export const playerCannotEndTurn = () => ({
	type: PLAYER_CANNOT_END_TURN
});

export const updatePlaysRemaining = data => ({
	type: UPDATE_PLAYS_REMAINING,
	payload: data
});

export const updateHand = data => ({
	type: UPDATE_HAND,
	payload: data
});

export const updateKeepers = data => ({
	type: UPDATE_KEEPERS,
	payload: data
});

export const addOpponent = data => ({
	type: ADD_OPPONENT,
	payload: data
});

export const startOpponentTurn = id => ({
	type: START_OPPONENT_TURN,
	payload: id
});

export const endOpponentTurn = id => ({
	type: END_OPPONENT_TURN,
	payload: id
});

export const updateOpponentPlaysRemaining = data => ({
	type: UPDATE_OPPONENT_PLAYS_REMAINING,
	payload: data
});

export const updateOpponentCardCount = data => ({
	type: UPDATE_OPPONENT_CARD_COUNT,
	payload: data
});

export const updateOpponentKeepers = data => ({
	type: UPDATE_OPPONENT_KEEPERS,
	payload: data
});

export const updateDrawRule = data => ({
	type: UPDATE_DRAW_RULE,
	payload: data
});

export const updatePlayRule = data => ({
	type: UPDATE_PLAY_RULE,
	payload: data
});

export const updateHandLimit = data => ({
	type: UPDATE_HAND_LIMIT,
	payload: data
});

export const updateKeeperLimit = data => ({
	type: UPDATE_KEEPER_LIMIT,
	payload: data
});

export const updateActionRules = data => ({
	type: UPDATE_ACTION_RULES,
	payload: data
});

export const updateGameplayRules = data => ({
	type: UPDATE_GAMEPLAY_RULES,
	payload: data
});

export const updateBonusRules = data => ({
	type: UPDATE_BONUS_RULES,
	payload: data
});

export const updateGoals = data => ({
	type: UPDATE_GOALS,
	payload: data
});

export const updateDeckCount = data => ({
	type: UPDATE_DECK_COUNT,
	payload: data
});

export const updateDiscardPile = data => ({
	type: UPDATE_DISCARD_PILE,
	payload: data
});

export const updateLoginForm = value => ({
	type: UPDATE_LOGIN_FORM,
	value
});

export const updateGameInfoTab = index => ({
	type: UPDATE_GAME_INFO_TAB,
	payload: index
});


// thunk action creators

