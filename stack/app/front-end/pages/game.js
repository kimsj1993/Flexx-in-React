import { Component } from 'react';
import { connect } from 'react-redux';

import { gameSelectors } from '../state/modules/data/game';

import withSocket from '../utils/withSocket';
import withLogin from '../utils/withLogin';

import Gameplay from '../views/game/gameplay/Gameplay';
import LobbyContainer from '../views/game/lobby/Lobby';
import RoomContainer from '../views/game/room/Room';
import Header from '../views/game/Header';

import { onSocketConnection, onSocketDisconnect } from '../utils/connectSocketAndRedux';

const mapStateToProps = ( state, ownProps ) => {
	const activeGame = gameSelectors.gameActive( state );
	const gameStarted = gameSelectors.gameStarted( state );

	return {
		activeGame,
		gameStarted,
		state
	}
};

class Game extends Component {

	componentDidMount() {
		const { socketConnection, dispatch, state } = this.props;

		socketConnection.connect( onSocketConnection( {
			dispatch,
			state
		} ) );

		const { socket } = socketConnection;
	}

	componentWillUnmount() {

		const { socketConnection } = this.props;
		
		socketConnection.disconnect( onSocketDisconnect );
	}

	handleLogout = e => {

		const { logout } = this.props;

		logout();
	}

	render() {
		const { gameActive, gameStarted } = this.props;

		return (
			<div>
				<Header />
				{ !gameActive && <LobbyContainer /> }
				{ gameActive && !gameStarted && <RoomContainer /> }
				{ gameStarted && <Gameplay /> }
			</div>
		);
	}
}

export default connect(
	mapStateToProps
)(withLogin(withSocket(Game)));