import { connect } from 'react-redux';

import { lobbyOperations, lobbySelectors } from '../../../state/modules/data/lobby';

import Lobby from './Lobby';

const mapStateToProps = ( state, { dispatch } ) => {
	const rooms = lobbySelectors.getJoinableRooms( state );

	return {
		rooms
	};
};

const mapDispatchToProps = dispatch => ( {
	createGame: () => dispatch( lobbyOperations.createGame() ),
	joinGame: id => () => dispatch( lobbyOperations.joinGame( { id } ) )
} )

const LobbyContainer = ( props ) => {
	console.log(props)
	return (<Lobby { ...props } />)
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( LobbyContainer );