import { connect } from 'react-redux';

import { lobbyOperations, lobbySelectors } from '../../../../state/modules/data/lobby';

import Lobby from './Lobby';

const mapStateToProps = ( state, { dispatch } ) => {
	const rooms = lobbySelectors.getJoinableRooms( state );

	const joinHandlerCreator = id => () => dispatch( lobbyOperations.joinGame( { id } ) );

	const createGameHandler = () => dispatch( lobbyOperations.createGame() );

	return {
		rooms,
		joinHandlerCreator,
		createGameHandler
	};
};

const LobbyContainer = ( props ) => (
	<Lobby { ...props } />
);

export default connect(
	mapStateToProps
)( LobbyContainer );