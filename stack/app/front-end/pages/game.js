import { Component } from 'react';
import { connect } from 'react-redux';


import { gameSelectors } from '../state/modules/data/game';

import withLogin from '../utils/withLogin';

import Gameplay from '../views/game/gameplay/Gameplay';
import LobbyContainer from '../views/game/lobby/LobbyContainer';
import RoomContainer from '../views/game/room/RoomContainer';
import Header from '../views/game/Header';

const mapStateToProps = ( state, ownProps ) => {
	const activeGame = state.data.game.active;
	const gameStarted = activeGame && state.data.lobby.byId[ state.data.game.id ] && state.data.lobby.byId[ state.data.game.id ].started;

	return {
		activeGame,
		gameStarted
	}
};

class Game extends Component {

	handleLogout = e => {

		const { logout } = this.props;

		logout();
	}

	render() {
		const { activeGame, gameStarted } = this.props;

		return (
			<div>
				<Header />
				{ !activeGame && <LobbyContainer /> }
				{ activeGame && !gameStarted && <RoomContainer /> }
				{ gameStarted && <Gameplay /> }
			</div>
		);
	}
}

export default connect(
	mapStateToProps
)(withLogin(Game));