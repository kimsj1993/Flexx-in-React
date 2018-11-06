import { connect } from 'react-redux';

import GameRulesTab from './GameRulesTab';

const mapStateToProps = (state, ownProps) => {
	const { drawRule, playRule, handLimit, keeperLimit, cards } = state.data;

	const actionRules = state.data.actionRules.map( id => {
		const data = state.data.rules[id];

		const { name, imageUrl } = data;

		return {
			name,
			imageUrl
		};
	});

	const gameplayRules = state.data.gameplayRules.map( id => {
		const data = state.data.rules[id];

		const { name, imageUrl } = data;

		return {
			name,
			imageUrl
		};
	});

	const bonusRules = state.data.bonusRules.map( id => {
		const data = state.data.rules[id];

		const { name, imageUrl } = data;

		return {
			name,
			imageUrl
		};
	});

	return {
		drawRule,
		playRule,
		handLimit,
		keeperLimit,
		actionRules,
		gameplayRules,
		bonusRules
	};
};

const GameRulesTabContainer = (props) => (
	<GameRulesTab {...props} />
);

export default connect(
	mapStateToProps
)(GameRulesTabContainer);