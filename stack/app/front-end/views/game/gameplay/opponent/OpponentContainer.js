import { connect } from 'react-redux';

import Opponent from './Opponent';

const mapStateToProps = (state, ownProps) => {
	const { opponentId } = ownProps;

	const { users } = state.data;
	const { name, imageUrl } = users[opponentId];

	const { opponents } = state.data;
	const { isTurn, playsRemaining, cardCount, keeperIds } = opponents[opponentId];

	return {
		name,
		imageUrl,
		isTurn,
		playsRemaining,
		cardCount,
		keeperIds
	};
};

const OpponentContainer = (props) => (
	<Opponent {...props} />
);

export default connect(
	mapStateToProps
)(OpponentContainer);