import { combineReducers } from 'redux';
import * as actions from './actions';

const userData = (state = null, action) => {
	switch (action.type) {
		case actions.UPDATE_USER_DATA:
			return action.data;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	userData
});

export default rootReducer;