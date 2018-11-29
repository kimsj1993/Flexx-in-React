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

					const { channel, event, ...args } = action.payload;

					console.log( 'Emitting ' + channel + ' event ' + event + ' with payload: ', args );

					socket.emit( channel, { e: event, ...args } );

				}

				break;

		};

		return next( action );

	};
};

export {
	createSocketMiddleware
};