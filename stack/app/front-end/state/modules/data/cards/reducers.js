import * as types from "./types";
import { handleAction } from 'redux-actions';
import { combineReducers } from "redux";

/* State Shape
{
	id1: {
		id: id1,
		name: String,
		type: String,
		subtype: String
	},
	...
}
*/

const byId = handleAction(
	types.ADD_CARD,
	( state, { payload } ) => ( {
		...state,
		[ payload.id ]: payload
	} ),
	{}
);

const allIds = handleAction(
	types.ADD_CARD,
	( state, { payload } ) => [ ...state, payload.id ],
	[]
);

const reducer = combineReducers( {
	byId,
	allIds
} );

export default reducer;