import * as types from "./types";
import { createAction } from 'redux-actions';

const enqueueMessage = createAction(
	types.ENQUEUE_MESSAGE,
	( { message = '', 
		options = {} ,
		key = new Date().getTime() + Math.random()
	} ) => ( { message, options, key } )
);

const dequeueMessage = createAction(
	types.DEQUEUE_MESSAGE,
	( { key } ) => ( { key } )
);

export {
	enqueueMessage,
	dequeueMessage
};