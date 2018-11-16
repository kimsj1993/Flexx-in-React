import { connect } from 'react-redux';

import { cardsSelectors } from '../../../../state/modules/data/cards';

import Card from './Card';

const mapStateToProps = (state, ownProps) => {
	const { id } = ownProps;

	const { type, name, subtype } = cardsSelectors.getCardById( state, id );

	return {
		type,
		name,
		subtype
	};
}

const CardContainer = (props) => (
	<Card {...props} />
);

export default connect(
	mapStateToProps
)(CardContainer);