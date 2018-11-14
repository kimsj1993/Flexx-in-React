import { combineReducers } from 'redux';
import * as types from "./types";
import produce from "immer";

/* State Shape
{
	id: gameId,
	host: playerId,
	active: Boolean,
	started: Boolean,
	ended: Boolean
}
*/

const idReducer = ( state = null, action ) => 
	produce( state, draft => {
		switch ( action.type ) {
			case types.INIT_GAME:
				return action.payload.id;
			case types.LEAVE_GAME:
			case types.END_GAME:
				return null;
		};
} );

const hostReducer = ( state = null, action ) =>
	produce( state, draft => {
		switch ( action.type ) {
			case types.INIT_GAME:
				return action.payload.host;
			case types.LEAVE_GAME:
			case types.END_GAME:
				return null;
		};
} );

const activeReducer = ( state = false, action ) => 
	produce( state, draft => {
		switch ( action.type ) {
			case types.INIT_GAME:
				return true;
			case types.LEAVE_GAME:
				return false;
		};
} );

const startedReducer = ( state = false, action ) => 
	produce( state, draft => {
		switch ( action.type ) {
			case types.INIT_GAME:
				return action.payload.started;
			case types.START_GAME:
				return true;
			case types.LEAVE_GAME:
			case types.END_GAME:
				return false;
			};
} );

const endedReducer = ( state = false, action ) => 
	produce( state, draft => {
		switch ( action.type ) {
			case types.INIT_GAME:
			case types.START_GAME:
			case types.LEAVE_GAME:
				return false;
			case types.END_GAME:
				return true;
			};
} );

const reducer = combineReducers( {
	id: idReducer,
	host: hostReducer,
	active: activeReducer,
	started: startedReducer,
	ended: endedReducer
} );

export default reducer;