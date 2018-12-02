import { createStore, applyMiddleware, combineReducers } from 'redux';

import thunkMiddleware from 'redux-thunk';
import { routerMiddleware as customRouterMiddleware } from './middleware/routerMiddleware';
import { authMiddleware } from './middleware/authMiddleware';
import { createSocketMiddleware } from './middleware/socketMiddleware';
import { apiMiddlewareWrapper } from './middleware/apiMiddlewareWrapper';
import { createRouterMiddleware, initialRouterState } from 'connected-next-router';
import { apiMiddleware } from 'redux-api-middleware';
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
			apiMiddlewareWrapper,
			apiMiddleware,
			authMiddleware,
			customRouterMiddleware,
			thunkMiddleware,
			createSocketMiddleware( 'https://fluxx.d.calebj.io' ),
			routerMiddleware,
			logger
		)
	);
};