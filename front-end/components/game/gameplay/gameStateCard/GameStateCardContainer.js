import { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../../actions';

import GameStateCard from './GameStateCard';

const mapStateToProps = (state, ownProps) => ({
	tabIndex: state.ui.gameInfoTab.index
});

class GameStateCardContainer extends Component {

	handleChange = (event, value) => {
		console.log(value)
		const { dispatch } = this.props;

		dispatch(Actions.updateGameInfoTab(value));
	}

	render = () => (
		<GameStateCard {...this.props} changeTab={ this.handleChange } />
	)
}

export default connect(
	mapStateToProps
)(GameStateCardContainer);