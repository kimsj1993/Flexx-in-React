import * as types from './types';
import { createAction } from 'redux-actions';

const changePage = createAction(
	types.CHANGE_PAGE,
	( { page } ) => page
);

export {
	changePage
};