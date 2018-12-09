import { connect } from 'react-redux';

import { userSelectors } from '../../../../state/modules/user';
import { gameSelectors, gameOperations } from '../../../../state/modules/data/game';

import AvailableAction from './AvailableAction';

const mapStateToProps = (state, ownProps) => {
	const userId = userSelectors.getUserId( state );
	const isTurn = gameSelectors.isPlayerTurn( state, userId );
	const canEndTurn = true;

	return {
		isTurn,
		canEndTurn
	};
};

const mapDispatchToProps = dispatch => ( {
	endTurn: () => dispatch( gameOperations.endTurn() )
} );

const AvailableActionContainer = (props) => (
	<AvailableAction {...props} />
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AvailableActionContainer);