import * as actions from "./actions";
import { socketOperations } from '../../socket';

const addMessage = actions.addMessage;
const clearMessages = actions.clearMessages;

const addMessages = ( { messages } ) => dispatch => 
	messages.forEach( obj => dispatch( addMessage( obj ) ) );

const replaceMessages = ( { messages } ) => dispatch => {
	dispatch( clearMessages() );
	dispatch( addMessages( { messages } ) );
};

const sendMessage = ( { message } ) => dispatch =>
	dispatch( socketOperations.socketEmit( { 
		channel: 'game',
		event: 'CHAT_MESSAGE',
		message
	} ) );

export {
	addMessage,
	clearMessages,
	addMessages,
	replaceMessages,
	sendMessage
};