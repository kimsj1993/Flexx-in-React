import io from 'socket.io-client';

import { socketTypes } from '../modules/socket';
import { onSocketConnect, onSocketDisconnect } from '../utils/socketReduxLogic';

const createSocketMiddleware = url => {
	let socket = null;
	let connected = false;

	return store => next => action => {

		switch( action.type ) {

			case socketTypes.SOCKET_CONNECT:
				if ( !connected ) {

					socket = io( url );
					connected = true;

					onSocketConnect( store.dispatch )( socket );

				}

				break;

			case socketTypes.SOCKET_DISCONNECT:
				if ( connected ) {

					socket.close();

					socket = null;
					connected = false;

					onSocketDisconnect( socket );

				}

				break;

			case socketTypes.SOCKET_EMIT:
				if ( connected ) {

					// todo

				}

				break;

		};

		return next( action );

	};
};

export {
	createSocketMiddleware
};