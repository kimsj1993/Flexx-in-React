import { connect } from 'react-redux';

import Opponent from './Opponent';

const mapStateToProps = (state, ownProps) => {
	const { playerId } = ownProps;

	const { players } = data;
	const { name, imageUrl } = players[playerId];

	const { playerData } = state.data.game;
	const { isTurn, playsRemaining, cardCount, keeperIds } = playerData[playerId];

	return {
		playerId,
		name,
		imageUrl,
		isTurn,
		playsRemaining,
		cardCount,
		keeperIds
	};
};

const OpponentContainer = (props) => (
	<Opponent ...props />
);

export default connect({
	mapStateToProps
})(OpponentContainer);