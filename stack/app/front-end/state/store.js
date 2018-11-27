import { createStore, applyMiddleware, combineReducers } from 'redux';

import thunkMiddleware from 'redux-thunk';
import { createSocketMiddleware } from './middleware/socketMiddleware';
import { createRouterMiddleware, initialRouterState } from 'connected-next-router';
import { createLogger } from 'redux-logger';

import * as reducers from './modules';

const routerMiddleware = createRouterMiddleware();

const logger = createLogger({
	diff: true
});

export default function configureStore( initialState = {}, options ) {

	if ( options.isServer ) {

		initialState.router = initialRouterState(options.asPath);

	}

	const rootReducer = combineReducers( reducers );

	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(
			thunkMiddleware,
			createSocketMiddleware( 'https://fluxx.d.calebj.io' ),
			routerMiddleware,
			logger
		)
	);
};