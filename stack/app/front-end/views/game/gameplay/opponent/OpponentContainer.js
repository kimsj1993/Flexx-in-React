import { connect } from 'react-redux';

import Opponent from './Opponent';

import { playersSelectors } from '../../../../state/modules/data/players';
import { usersSelectors } from '../../../../state/modules/data/users';
import { turnSelectors } from '../../../../state/modules/data/turn';

const mapStateToProps = (state, ownProps) => {
	const { opponentId } = ownProps;

	const name = usersSelectors.getUserById( state, opponentId ).username;

	const isTurn = turnSelectors.isPlayerTurn( state, opponentId );

	const playsRemaining = turnSelectors.getPlaysRemaining( state );

	const cardCount = playersSelectors.getPlayerCardCount( state, opponentId );

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