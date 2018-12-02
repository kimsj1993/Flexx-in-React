import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { passwordModalUIOperations } from '../../../state/modules/ui/password-modal';
import { lobbyOperations } from '../../../state/modules/data/lobby';

import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import Tooltip from '@material-ui/core/Tooltip';

const mapDispatchToProps = dispatch => ( {
    joinGame: id => () => dispatch( lobbyOperations.joinGame( { id } ) ),
    showPasswordModal: id => () => dispatch( passwordModalUIOperations.showModal( { id } ) )
} );

const JoinOpenGameButton = ( { joinGame, id } ) => (
    <Button 
        variant='outlined' 
        color='primary'
        onClick={ joinGame( id ) }
    > 
        Join 
    </Button>
);

const joinProtectedGameButtonStyles = theme => ( {
    iconRoot: {
        fontSize: '16px',
        marginRight: 4
    },
    buttonRoot: {
        paddingRight: 24
    }
} );

let JoinProtectedGameButton = ( { classes, showPasswordModal, id } ) => (
    <Tooltip title='This game is password protected' >
        <Button 
            classes={ { root: classes.buttonRoot } } 
            variant='outlined' 
            color='primary'
            onClick={ showPasswordModal( id ) } 
        >
            <LockIcon classes={ { root: classes.iconRoot } } />
            Join
        </Button>
    </Tooltip>
);

JoinProtectedGameButton = withStyles( joinProtectedGameButtonStyles )( JoinProtectedGameButton );

const JoinGameButton = ( { id, hasPassword, joinGame, showPasswordModal } ) =>
    hasPassword ? 
        <JoinProtectedGameButton
            showPasswordModal={ showPasswordModal }
            id={ id }
        /> :
        <JoinOpenGameButton
            joinGame={ joinGame }
            id={ id }
        />;

export default connect(
    null,
    mapDispatchToProps
)( JoinGameButton );