import { createContext } from 'react';

const LoginContext = createContext({
	loggedIn: false
});

export default LoginContext;

export const Provider = LoginContext.Provider;

export const Consumer = LoginContext.Consumer;