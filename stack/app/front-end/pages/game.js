import { Component } from 'react';
import { connect } from 'react-redux';


import { gameSelectors } from '../state/modules/data/game';
import { appUISelectors } from '../state/modules/ui/app';

import CircularProgress from '@material-ui/core/CircularProgress';

import Gameplay from '../views/game/gameplay/Gameplay';
import LobbyContainer from '../views/game/lobby/LobbyContainer';
import RoomContainer from '../views/game/room/RoomContainer';
import Header from '../views/game/Header';

import LogoutModal from '../views/LogoutModal';

const mapStateToProps = ( state, ownProps ) => {
	const activeGame = state.data.game.active;
	const gameStarted = activeGame && state.data.lobby.byId[ state.data.game.id ] && state.data.lobby.byId[ state.data.game.id ].started;

	return {
		activeGame,
		gameStarted,
		...appUISelectors.getProps( state )
	}
};

const GameScreen = ( { activeGame, gameStarted } ) => (
	<>
		<Header />
		{ !activeGame && <LobbyContainer /> }
		{ activeGame && !gameStarted && <RoomContainer /> }
		{ gameStarted && <Gameplay /> }
	</>
)

class Game extends Component {

	render() {
		const { loading, error, activeGame, gameStarted } = this.props;

		return (
			<div>
				<LogoutModal />
				{ loading ? <CircularProgress /> : <GameScreen activeGame={ activeGame } gameStarted={ gameStarted } /> }
			</div>
		);
	}
}

export default connect(
	mapStateToProps
)(Game);