import { connect } from 'react-redux';

import PlayerTurnCard from './PlayerTurnCard';

const mapStateToProps = (state, ownProps) => {
	const { playerId, users } = state.data;

	const { imageUrl, name } = users[playerId];

	const { isTurn, playsRemaining, canEndTurn } = state.data;

	return {
		imageUrl,
		name,
		isTurn,
		playsRemaining,
		canEndTurn
	};
};

const PlayerTurnCardContainer = (props) => (
	<PlayerTurnCard {...props} />
);

export default connect(
	mapStateToProps
)(PlayerTurnCardContainer);