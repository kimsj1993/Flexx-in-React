import { connect } from 'react-redux';

import { tableSelectors } from '../../../../../state/modules/data/table';
import { cardsSelectors } from '../../../../../state/modules/data/cards';

import GameRulesTab from './GameRulesTab';

const mapStateToProps = (state, ownProps) => {
	const drawRule = tableSelectors.getDrawRule( state );
	const playRule = tableSelectors.getPlayRule( state );
	const handLimit = tableSelectors.getHandLimit( state );
	const keeperLimit = tableSelectors.getKeeperLimit( state );

	const rules = tableSelectors.getRules( state );
	const actionRules = rules.filter( ( { subtype } ) => subtype == 'action_rule' );
	const gameplayRules = rules.filter( ( { subtype } ) => subtype == 'game_rule' );
	const bonusRules = rules.filter( ( { subtype } ) => subtype == 'bonus' );

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