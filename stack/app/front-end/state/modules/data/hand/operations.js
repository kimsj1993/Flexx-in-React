import * as actions from "./actions";
import fetch from 'cross-fetch';

const updateHand = actions.updateHand;
const updateTempHand = actions.updateTempHand;

const playCard = ( { gameId, cardId } ) => dispatch => {
	fetch(
		'https://fluxx.d.calebj.io/api/games/' + gameId + '?play&card_id=' + cardId,
		{
			method: 'POST',
			credentials: 'include'
		}
	);
};

export {
	updateHand,
	updateTempHand,
	playCard
};