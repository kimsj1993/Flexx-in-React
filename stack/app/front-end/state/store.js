import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import * as reducers from './modules';

const logger = createLogger({
	diff: true
});

export default function configureStore( initialState ) {
	const rootReducer = combineReducers( reducers );

	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(
			thunkMiddleware,
			logger
		)
	);
};