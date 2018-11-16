import * as actions from "./actions";

const addCard = actions.addCard;

const addCards = ( { cards } ) => dispatch => 
	cards.forEach( card => dispatch( addCard( card ) ) );

export {
	addCard,
	addCards
};