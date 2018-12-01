import { connect } from 'react-redux';

import { lobbyUISelectors, lobbyUIOperations } from '../../../state/modules/ui/lobby';

import { lobbyOperations, lobbySelectors } from '../../../state/modules/data/lobby';

import { createGameModalUIOperations } from '../../../state/modules/ui/create-game-modal';

import Lobby from './Lobby';

const mapDispatchToProps = dispatch => ( {
	createGame: () => dispatch( lobbyOperations.createGame() ),
	showCreateGameDialog: () => dispatch( createGameModalUIOperations.showDialog() ),
	joinGame: id => () => dispatch( lobbyOperations.joinGame( { id } ) ),
	changePage: ( e, page ) => dispatch( lobbyUIOperations.changePage( { page } ) )
} )

const LobbyContainer = ( props ) => {
	return (<Lobby { ...props } />)
};

export default connect(
	lobbyUISelectors.getProps,
	mapDispatchToProps
)( LobbyContainer );