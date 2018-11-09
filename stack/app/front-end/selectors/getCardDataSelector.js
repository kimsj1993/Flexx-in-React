import { createSelector } from 'reselect';

const getCardData = ({ cardData }, { type, id }) => 
	cardData[type][id];

const makeGetCardData = () => {
	return createSelector(
		[ getCard ],
		card => card
	);
};

export default makeGetCard;