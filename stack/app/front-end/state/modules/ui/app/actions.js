import * as types from './types';
import { createAction } from 'redux-actions';

const appLoadRequest = createAction( types.APP_LOAD_REQUEST );

const appLoadSuccess = createAction( types.APP_LOAD_SUCCESS );

const appLoadError = createAction( types.APP_LOAD_ERROR );

export {
	appLoadRequest,
	appLoadSuccess,
	appLoadError
};