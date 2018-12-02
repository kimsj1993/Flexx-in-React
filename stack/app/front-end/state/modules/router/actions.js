import * as types from "./types";
import { createAction } from 'redux-actions';

const checkRoute = createAction( types.CHECK_ROUTE );

export {
	checkRoute
};