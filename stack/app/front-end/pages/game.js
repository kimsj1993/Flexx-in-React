import { Component } from 'react';
import { connect } from 'react-redux';


import { gameSelectors } from '../state/modules/data/game';

import withSocket from '../utils/withSocket';
import withLogin from '../utils/withLogin';

import Gameplay from '../views/game/gameplay/Gameplay';
import LobbyContainer from '../views/game/lobby/LobbyContainer';
import RoomContainer from '../views/game/room/RoomContainer';
import Header from '../views/game/Header';

import { onSocketConnection, onSocketDisconnect } from '../utils/connectSocketAndRedux';

const mapStateToProps = ( state, ownProps ) => {
	const activeGame = state.data.game.active;
	const gameStarted = activeGame && state.data.lobby.byId[ state.data.game.id ] && state.data.lobby.byId[ state.data.game.id ].started;

	return {
		activeGame,
		gameStarted
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
)(withLogin(withSocket(Game)));