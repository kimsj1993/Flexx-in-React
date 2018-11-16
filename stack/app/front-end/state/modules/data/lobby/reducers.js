import { combineReducers } from "redux";
import * as types from "./types";



const roomsReducer = ( state = {}, action ) => {
	switch(action.type) {
		case types.UPDATE_ROOMS: {
			return action.payload;
		}
		case types.ADD_ROOM: {
			return Object.assign( {}, state, { [ action.payload.id ] : action.payload } );
		}
		case types.REMOVE_ROOM: {
			const { [action.payload.id ]: value, ...rest } = state;
			return Object.assign( {}, rest );
		}
		case types.ROOM_STARTED: {
			const room = state[action.payload];
			return Object.assign( {}, state, { [ action.payload ]: Object.assign( {}, room, { started: true } ) } );
		}
		case types.UPDATE_ROOM: {
			const room = state[ action.payload.id ];
			return Object.assign( {}, state, { [ action.payload.id ] : action.payload.room } );
		}
		case types.ROOM_USER_JOINED: {
			const room = state[action.payload.roomId];
			const { playerCount } = room;
			return Object.assign( {}, state, 
				{ [action.payload[roomId]]: Object.assign( 
					{}, 
					room, 
					{ playerCount : playerCount + 1 } 
				) } );
		}
		case types.ROOM_USER_LEFT: {
			const room = state[action.payload.roomId];
			const { playerCount } = room;
			return Object.assign( {}, state, 
				{ [action.payload.roomId] : Object.assign( 
					{}, 
					room, 
					{ playerCount: playerCount - 1 } 
				) } );
		}
		default: return state;
	};
};

const reducer = combineReducers({
	rooms: roomsReducer
});

export default reducer;