import * as types from "./types";
import produce from "immer";

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

const reducer = (state = {}, action) => 
	produce( state, draft => {
		switch ( action.type ) {
			case types.ADD_CARD:
				draft[ action.payload.id ] = action.payload;
				return draft;
			case types.ADD_CARDS:
				action.payload.forEach( card => {
					draft[ card.id ] = card;
				});
				return draft;
		};
} );

export default reducer;