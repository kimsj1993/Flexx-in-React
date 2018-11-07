import { createContext } from 'react';

const SocketContext = createContext({
	socket: null,
	connect: () => {},
	disconnect: () => {},
	connected: false
});

export default SocketContext;

export const Provider = SocketContext.Provider;

export const Consumer = SocketContext.Consumer;