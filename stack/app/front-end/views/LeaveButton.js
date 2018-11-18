import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';

import { roomOperations } from '../state/modules/data/room';

const mapStateToProps = state => {
	const activeGame = state.data.game.active;
	const gameStarted = activeGame && state.data.lobby.byId[ state.data.game.id ] && state.data.lobby.byId[ state.data.game.id ].started;
	const isHost = state.data.user.id == ( state.data.lobby.byId[ state.data.game.id ] && state.data.lobby.byId[ state.data.game.id ].host );

	return {
		activeGame,
		gameStarted,
		isHost
	}
};

const mapDispatchToProps = dispatch => ( {
	leaveGame: () => dispatch( roomOperations.leaveGame() ),
	deleteGame: () => dispatch( roomOperations.deleteGame() )
} );

const LeaveButton = ( { activeGame, gameStarted, isHost, leaveGame, deleteGame } ) => (
	<div>
	{ activeGame && isHost && ( <Button color='primary' variant='contained' onClick={ deleteGame }>Delete Game</Button> ) }
	{ activeGame && !isHost && ( <Button color='primary' variant='contained' onClick={ leaveGame }>Leave Game</Button> ) }
	</div>
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LeaveButton);