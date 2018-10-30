import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const makeStore = (initialState, options) => 
	createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk)
	);

export default makeStore;