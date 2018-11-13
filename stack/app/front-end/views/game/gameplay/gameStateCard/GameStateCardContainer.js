import { Component } from 'react';
import { connect } from 'react-redux';

import { gameInfoTabSelectors, gameInfoTabOperations } from '../../../../state/modules/ui/game-info-tab';

import GameStateCard from './GameStateCard';

const mapStateToProps = (state, ownProps) => ({
	tabIndex: gameInfoTabSelectors.getTabIndex( state )
});

class GameStateCardContainer extends Component {

	handleChange = (event, value) => {
		const { dispatch } = this.props;

		dispatch( gameInfoTabOperations.updateTab( { index: value } ) );
	}

	render = () => (
		<GameStateCard {...this.props} changeTab={ this.handleChange } />
	)
}

export default connect(
	mapStateToProps
)(GameStateCardContainer);