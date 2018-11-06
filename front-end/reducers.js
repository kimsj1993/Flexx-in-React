import { combineReducers } from 'redux';
import * as Actions from './actions';

import dummyState from './dummyState';

const keepers = (state = null, action) => {
	switch (action.type) {
		case Actions.ADD_KEEPER_DATA:
			return {

			};
		default:
			return state;
	}
}

const data = state => (state || dummyState.data);

const userData = (state = null, action) => {
	switch (action.type) {
		case Actions.UPDATE_USER_DATA:
			return action.data;
		default:
			return state;
	}
};

const playerId = (state = null, action) => {
	switch (action.type) {
		case Actions.UPDATE_USER_DATA:
			return action.data;
		default:
			return state;
	}
}

const loginFormUIValue = (state = '', action) => {
	switch (action.type) {
		case Actions.UPDATE_LOGIN_FORM:
			return action.value;
		default:
			return state;
	}
}

const loginFormUI = combineReducers({
	value: loginFormUIValue
});

const gameInfoTabUIIndex = (state = 0, action) => {
	switch (action.type) {
		case Actions.UPDATE_GAME_INFO_TAB:
			return action.payload;
		default:
			return state;
	}
};

const gameInfoTabUI = combineReducers({
	index: gameInfoTabUIIndex
});

const ui = combineReducers({
	loginForm: loginFormUI,
	gameInfoTab: gameInfoTabUI
});

const rootReducer = combineReducers({
	data,
	ui
});

export default rootReducer;