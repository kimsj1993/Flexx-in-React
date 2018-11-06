import { connect } from 'react-redux';

import Hand from './Hand';

const mapStateToProps = (state, ownProps) => {
	const { hand } = state.data.game.playerData;

	const cards = hand.map(({ id, type }) => {
		const data = state.data.cards[type + 's'][id];

		return { id, type };
	});
	
	return { cards };
};

const HandContainer = (props) => (
	<Hand {...props} />
);

export default connect(
	mapStateToProps
)(HandContainer);