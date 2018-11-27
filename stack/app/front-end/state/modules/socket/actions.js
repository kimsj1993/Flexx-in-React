import * as types from "./types";
import { createAction } from 'redux-actions';

const socketConnect = createAction( types.SOCKET_CONNECT );
const socketDisconnect = createAction( types.SOCKET_DISCONNECT );
const socketEmit = createAction(
	types.SOCKET_EMIT,
	( { channel, event, ...args } ) => ( { channel, event, ...args } )
);

export {
	socketConnect,
	socketDisconnect,
	socketEmit
};