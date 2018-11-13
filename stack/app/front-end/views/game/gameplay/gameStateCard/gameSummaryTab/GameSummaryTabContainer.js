import { connect } from 'react-redux';

import { tableSelectors } from '../../../../../state/modules/data/table';
import { cardsSelectors } from '../../../../../state/modules/data/cards';

import GameSummaryTab from './GameSummaryTab';

const mapStateToProps = (state, ownProps) => {
	const drawRule = tableSelectors.getDrawRule( state );
	const playRule = tableSelectors.getPlayRule( state );
	const handLimit = tableSelectors.getHandLimit( state );
	const keeperLimit = tableSelectors.getKeeperLimit( state );
	const goalIds = tableSelectors.getGoalIds( state );

	const goals = goalIds.map( id => cardsSelectors.getCard( id ) );

	return {
		drawRule,
		playRule,
		handLimit,
		keeperLimit,
		goals
	};
};

const GameSummaryTabContainer = (props) => (
	<GameSummaryTab {...props} />
);

export default connect(
	mapStateToProps
)(GameSummaryTabContainer);