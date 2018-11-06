import { connect } from 'react-redux';

import GameRulesTab from './GameRulesTab';

const mapStateToProps = (state, ownProps) => {
	const { game, cards } = state.data;
	const { currentRules } = game;

	const { drawRule, playRule, handLimit, keeperLimit } = currentRules;

	const actionRules = currentRules.actionRules.map( id => {
		const data = cards.rules[id];

		const { name, imageUrl } = data;

		return {
			name,
			imageUrl
		};
	});

	const gameplayRules = currentRules.gameplayRules.map( id => {
		const data = cards.rules[id];

		const { name, imageUrl } = data;

		return {
			name,
			imageUrl
		};
	});

	const bonusRules = currentRules.bonusRules.map( id => {
		const data = cards.rules[id];

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