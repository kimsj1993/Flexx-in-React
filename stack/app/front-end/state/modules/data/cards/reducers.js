import * as types from "./types";

const reducer = (state = {}, action) => {
	switch(action.type) {
		case types.ADD_CARD:
			return {
				...state,
				[action.payload.id]: action.payload
			};
		default: return state;
	}
};

export default reducer;