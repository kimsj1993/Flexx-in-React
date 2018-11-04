import { createContext } from 'react';

const SocketContext = createContext(null);

export default SocketContext;

export const Provider = SocketContext.Provider;

export const Consumer = SocketContext.Consumer;