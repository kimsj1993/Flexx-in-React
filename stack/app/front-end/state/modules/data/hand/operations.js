import * as actions from "./actions";
import fetch from 'cross-fetch';

const addHandCard = actions.addHandCard;
const removeHandCard = actions.removeHandCard;
const clearHand = actions.clearHand;
const addTempHandCard = actions.addTempHandCard;
const removeTempHandCard = actions.removeTempHandCard;
const clearTempHand = actions.clearTempHand;

const addHandCards = ( { ids } ) => dispatch =>
	ids.forEach( id => dispatch( addHandCard( { id } ) ) );

const removeHandCards = ( { ids } ) => dispatch =>
	ids.forEach( id => dispatch( removeHandCard( { id } ) ) );

const replaceHand = ( { ids } ) => dispatch => {
	dispatch( clearHand() );
	dispatch( addHandCards( { ids } ) );
};

const addTempHandCards = ( { ids } ) => dispatch =>
	ids.forEach( id => dispatch( addTempHandCard( { id } ) ) );

const removeTempHandCards = ( { ids } ) => dispatch =>
	ids.forEach( id => dispatch( removeTempHandCard( { id } ) ) );

const replaceTempHand = ( { ids } ) => dispatch => {
	dispatch( clearTempHand() );
	dispatch( addTempHandCards( { ids } ) );
};

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
	addHandCard,
	removeHandCard,
	clearHand,
	addTempHandCard,
	removeTempHandCard,
	clearTempHand,
	addHandCards,
	removeHandCards,
	replaceHand,
	addTempHandCards,
	removeTempHandCards,
	replaceTempHand,
	playCard
};