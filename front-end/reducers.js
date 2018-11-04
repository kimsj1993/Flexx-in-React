import { combineReducers } from 'redux';
import * as actions from './actions';

const userData = (state = null, action) => {
	switch (action.type) {
		case actions.UPDATE_USER_DATA:
			return action.data;
		default:
			return state;
	}
};

const loginFormUIValue = (state = '', action) => {
	switch (action.type) {
		case actions.UPDATE_LOGIN_FORM:
			return action.value;
		default:
			return state;
	}
}

const loginFormUI = combineReducers({
	value: loginFormUIValue,

});

const ui = combineReducers({
	loginForm: loginFormUI
});

const rootReducer = combineReducers({
	userData,
	ui
});

export default rootReducer;