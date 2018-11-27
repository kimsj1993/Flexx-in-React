import * as types from './types';
import { createAction } from 'redux-actions';

const updateChatMessageField = createAction(
	types.UPDATE_CHAT_MESSAGE_FIELD,
	( { value } ) => value
);

const clearChatMessageField = createAction( types.CLEAR_CHAT_MESSAGE_FiELD );

export {
	updateChatMessageField,
	clearChatMessageField
};