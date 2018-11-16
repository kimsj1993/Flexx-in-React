import { connect } from 'react-redux';

import { playersSelectors } from '../../../../state/modules/data/players';
import { userSelectors } from '../../../../state/modules/data/user';
import { usersSelectors } from '../../../../state/modules/data/users';
import { tableSelectors } from '../../../../state/modules/data/table';
import { gameSelectors } from '../../../../state/modules/data/game';

import PlayerTurnCard from './PlayerTurnCard';

const mapStateToProps = (state, ownProps) => {
	const userId = userSelectors.getUserId( state );
	const user = usersSelectors.getUserById( state, userId );

	const name = user && user.username;

	const isTurn = gameSelectors.isPlayerTurn( state, userId );

	const player = playersSelectors.getPlayerById( state, userId );

	const playsRemaining = player && player.playsLeft;

	const canEndTurn = true;

	return {
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