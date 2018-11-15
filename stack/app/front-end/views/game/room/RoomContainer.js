import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { roomOperations, roomSelectors } from '../../../state/modules/data/room';
import { playersSelectors } from '../../../state/modules/data/players';
import { usersSelectors } from '../../../state/modules/data/users';
import { gameSelectors } from '../../../state/modules/data/game';

import Room from './Room';

const mapStateToProps = state => {
	const playerIds = playersSelectors.getPlayerIds( state );
	const players = playerIds.map( id => { name: usersSelectors.getUserById( state, id ).username } );

	return {
		players
	};
};

const mapDispatchToProps = dispatch => bindActionCreators( {
	startGameHandler: () => ( _, getState ) => {
		const state = getState();
		const gameId = gameSelectors.getGameId( state );

		dispatch(roomOperations.startGame( { id: gameId } ) );
	},
	deleteGameHandler: () => ( _, getState ) => {
		const state = getState();
		const gameId = gameSelectors.getGameId( state );

		dispatch( lobbyOperations.deleteGame( { id: gameId } ) );
	}
}, dispatch );

const RoomContainer = ( props ) => {
	console.log('RoomContainer: ', props);
	return (<Room { ...props } />);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( RoomContainer );