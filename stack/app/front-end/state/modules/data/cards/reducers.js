import * as types from "./types";

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

const reducer = (state = {}, action) => {
	switch(action.type) {
		case types.ADD_CARD:
			return {
				...state,
				[action.payload.id]: action.payload
			};
		case types.ADD_CARDS:
			return action.payload.reduce( ( prevState, card ) => ( {
				...prevState,
				[card.id] : card
			} ), { ...state } );
		default: return state;
	}
};

export default reducer;