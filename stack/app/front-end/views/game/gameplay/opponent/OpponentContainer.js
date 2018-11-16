import { connect } from 'react-redux';

import Opponent from './Opponent';

import { playersSelectors } from '../../../../state/modules/data/players';
import { usersSelectors } from '../../../../state/modules/data/users';
import { gameSelectors } from '../../../../state/modules/data/game';

const mapStateToProps = (state, ownProps) => {
	const { opponentId } = ownProps;

	const name = usersSelectors.getUserById( state, opponentId ).username;

	const isTurn = gameSelectors.isPlayerTurn( state, opponentId );

	const playsRemaining = playersSelectors.getPlayerById( state, opponentId ).playsLeft;

	const cardCount = playersSelectors.getPlayerById( state, opponentId ).cards;

	const keeperIds = playersSelectors.getPlayerKeeperIds( state, opponentId );

	return {
		name,
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