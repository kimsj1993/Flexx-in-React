import { connect } from 'react-redux';

import { cardsOperations, cardsSelectors } from '../../../state/modules/data/cards';

import Card from './Card';

const mapStateToProps = (state, ownProps) => {
	const { id } = ownProps;

	const { type, name } = cardsSelectors.getCardById( state, id );
	
	return { type, name };
};

const CardContainer = (props) => (
	<Card {...props} />
);

export default connect(
	mapStateToProps
)(CardContainer);