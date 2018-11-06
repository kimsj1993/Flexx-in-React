import { connect } from 'react-redux';

import Opponent from './Opponent';

const mapStateToProps = (state, ownProps) => {
	const { opponentId } = ownProps;

	const { players } = state.data;
	const { name, imageUrl } = players[opponentId];

	const { opponentData } = state.data.game;
	const { isTurn, playsRemaining, cardCount, keeperIds } = opponentData[opponentId];

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