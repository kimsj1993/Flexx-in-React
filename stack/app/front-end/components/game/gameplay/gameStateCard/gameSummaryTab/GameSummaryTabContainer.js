import { connect } from 'react-redux';

import GameSummaryTab from './GameSummaryTab';

const mapStateToProps = (state, ownProps) => {
	const { drawRule, playRule, handLimit, keeperLimit, currentGoals } = state.data;

	const goals = currentGoals.map( id => {
		const data = state.data.goals[id];

		const { name, requirements } = data;

		return {
			name,
			requirements
		};
	});

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