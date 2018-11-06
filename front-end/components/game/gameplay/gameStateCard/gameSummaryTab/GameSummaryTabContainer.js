import { connect } from 'react-redux';

import GameSummaryTab from './GameSummaryTab';

const mapStateToProps = (state, ownProps) => {
	const { game, cards } = state.data;
	const { currentRules, currentGoals } = game;

	const { drawRule, playRule, handLimit, keeperLimit } = currentRules;

	const goals = currentGoals.map( id => {
		const data = cards.goals[id];

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