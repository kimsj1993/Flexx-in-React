import { combineReducers } from "redux";
import * as types from "./types";

const roomsReducer = ( state = {}, action ) => {
	switch(action.type) {
		case types.UPDATE_ROOMS:
			return action.payload;
		default: return state;
	};
};

const loadedReducer = ( state = false, action ) => {
	switch(action.type) {
		case types.FETCH_ROOMS:
			return action.payload.done;
		default: return state;
	};
};

const errorReducer = ( state = false, action ) => {
	switch(action.type) {
		case types.FETCH_ROOMS:
			return !action.payload.success;
		default: return state;
	};
};

const reducer = combineReducers({
	rooms: roomsReducer,
	loaded: loadedReducer,
	error: errorReducer
});

export default reducer;