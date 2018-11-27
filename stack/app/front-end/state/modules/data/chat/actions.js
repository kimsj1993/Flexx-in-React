import * as types from "./types";
import { createAction } from 'redux-actions';

const addMessage = createAction(
	types.ADD_MESSAGE,
	( { userId, message } ) => ( { userId, message } )
);

const clearMessages = createAction( types.CLEAR_MESSAGES );

export {
	addMessage,
	clearMessages
};