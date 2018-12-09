import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from "./types";

const notifications = handleActions(
	{
		[ types.ENQUEUE_MESSAGE ]: ( state, { payload } ) => [
			...state,
			{
				...payload
			}
		],

		[ types.DEQUEUE_MESSAGE ]: ( state, { payload } ) =>
			state.filter( msg => msg.key != payload.key )
	},

	[]
);

const reducer = combineReducers( {
	notifications
} );

export default reducer;