import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

export default const makeStore (initialState, options) => 
	createStore(
		reducer,
		initialState,
		applyMiddleware(thunk)
	);