import * as types from "./types";
import { createAction } from 'redux-actions';

const addCard = createAction(
	types.ADD_CARD,
	( { id, name, type, subtype } ) => ( { id, name, type, subtype } )
);

export {
	addCard
};