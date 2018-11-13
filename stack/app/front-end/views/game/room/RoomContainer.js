import { connect } from 'react-redux';

import { roomOperations, roomSelectors } from '../../../../state/modules/data/room';
import { playersSelectors } from '../../../../state/modules/data/players';
import { usersSelectors } from '../../../../state/modules/data/users';
import { gameSelectors } from '../../../../state/modules/data/game';

import Room from './Room';

const mapStateToProps = ( state, { dispatch } ) => {
	const playerIds = playersSelectors.getPlayerIds( state );
	const players = playerIds.map( id => { name: usersSelectors.getUserById( state, id ).username } );

	const gameId = gameSelectors.getGameId( state );

	const startGameHandler = () => dispatch( roomOperations.startGame( { id: gameId } ) );

	const deleteGameHandler = () => dispatch( lobbyOperations.deleteGame( { id: gameId } ) );

	return {
		players,
		startGameHandler,
		deleteGameHandler
	};
};

const RoomContainer = ( props ) => (
	<Room { ...props } />
);

export default connect(
	mapStateToProps
)( RoomContainer );