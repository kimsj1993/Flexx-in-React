import * as types from "./types";
import { createAction } from 'redux-actions';

const addCard = createAction(
	types.ADD_CARD,
	( { id, name, type, subtype, precondition, description } ) => ( { id, name, type, subtype, precondition, description } )
);

export {
	addCard
};