import { createSelector } from 'reselect';

const getCard = ({ cardData }, { type, id }) => 
	cardData[type][id];

const makeGetCard = () => {
	return createSelector(
		[ getCard ],
		card => card
	);
};

export default makeGetCard;