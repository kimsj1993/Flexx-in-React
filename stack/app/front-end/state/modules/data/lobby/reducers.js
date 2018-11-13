import { combineReducers } from "redux";
import * as types from "./types";



const roomsReducer = ( state = {}, action ) => {
	switch(action.type) {
		case types.UPDATE_ROOMS:
			return action.payload;
		case types.ADD_ROOM:
			return {
				...state,
				[action.payload.id]: action.payload
			};
		case types.REMOVE_ROOM:
			const { [action.payload.id ], ...rest } = state;
			return rest;
		case types.ROOM_STARTED:
			const room = state[action.payload];
			return {
				...state,
				[action.payload]: {
					...room,
					started: true
				}
			};
		case types.ROOM_USER_JOINED:
			const room = state[action.payload];
			const { playerCount } = room;
			return {
				...state,
				[action.payload]: {
					...room,
					playerCount: playerCount + 1
				}
			};
		case types.ROOM_USER_LEFT:
			const room = state[action.payload];
			const { playerCount } = room;
			return {
				...state,
				[action.payload]: {
					...room,
					playerCount: playerCount - 1
				}
			};
		default: return state;
	};
};

const reducer = combineReducers({
	rooms: roomsReducer
});

export default reducer;