import { connect } from 'react-redux';

import { turnSelectors } from '../../../../state/modules/data/turn';
import { userSelectors } from '../../../../state/modules/data/user';
import { usersSelectors } from '../../../../state/modules/data/users';
import { tableSelectors } from '../../../../state/modules/data/table';

import PlayerTurnCard from './PlayerTurnCard';

const mapStateToProps = (state, ownProps) => {
	const userId = userSelectors.getUserId( state );
	const user = usersSelectors.getUserById( state, userId );

	const name = user.username;

	const isTurn = turnSelectors.isPlayerTurn( state, userId );

	const playsRemaining = turnSelectors.getPlaysRemaining();

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