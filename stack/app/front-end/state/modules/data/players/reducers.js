import * as types from "./types";
import { gameTypes } from '../game';

/* State Shape
{
    player_id: {
    	id: player_id,
		cardCount: Number >= 0,
		keepers: [ card_id ],
		position: Number
    }
}
*/

const reducer = ( state = {}, action ) => {
	switch (action.type) {
		case types.ADD_PLAYER:
			return {
				...state,
				[ action.payload.id ]: action.payload
			};
		case types.ADD_PLAYERS:
			return {
				...state,
				action.payload
			};
		case types.REMOVE_PLAYER:
			const { [ payload.id ], ...rest } = state;
			return rest;
		case types.UPDATE_PLAYER_CARD_COUNT:
			const { cardCount, ...rest } = state[ payload.id ];
			return {
				...state,
				[ payload.id ]: {
					...rest,
					cardCount: payload.count
				}
			};
		case types.UPDATE_PLAYER_KEEPERS:
			const { keepers, ...rest } = state[ payload.id ];
			return {
				...state,
				[ payload.id ]: {
					...rest,
					keepers: payload.keepers
				}
			};
		case gameTypes.END_GAME:
			const playerIds = Objects.keys( state );
			return playerIds.reduce( ( newState, id ) => ( {
				...newState,
				[id]: {
					id,
					cardCount: 0,
					keepers: [],
					position: state[ id ].position
				}
			} ), {} );
		case gameTypes.LEAVE_GAME:
			return {};
		default: return state;
	}
};

export default reducer;