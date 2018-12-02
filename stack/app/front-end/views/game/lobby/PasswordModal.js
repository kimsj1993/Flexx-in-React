import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { passwordModalUISelectors, passwordModalUIOperations } from '../../../state/modules/ui/password-modal';
import { lobbyOperations } from '../../../state/modules/data/lobby';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

const Transition = props => <Slide direction='down' { ...props } />;

const mapDispatchToProps = dispatch => ( {
	handleClose: () => dispatch( passwordModalUIOperations.hideModal() ),
	joinGame: ( { id, password }) => e => {
		e.preventDefault();
		dispatch( passwordModalUIOperations.joinGame( { id, password } ) );
	},
	handleInputChange: e => dispatch( passwordModalUIOperations.updateTextField( { value: e.target.value } ) )
} );

const JoinGameForm = ( {
	value, error, handleClose, handleInputChange, id, joinGame
} ) => (
	<>
	<DialogTitle>Join Game</DialogTitle>
	<form onSubmit={ joinGame( { id, password: value } ) } >
		<DialogContent>

			<DialogContentText>
				This game requires a password to join. Please enter the password below.
			</DialogContentText>
			<TextField
				error={ error }
            	autoFocus
            	margin="dense"
            	label='Password'
            	type="password"
            	value={ value }
            	onChange={ handleInputChange }
            	helperText={ error || 'Please enter the correct password.'}
            	error={ Boolean( error ) }
            	fullWidth
            	required
            />
		</DialogContent>
		<DialogActions>
			<Button onClick={ handleClose }>
				Cancel
			</Button>
			<Button type='submit' color='primary'>
				Join
			</Button>
		</DialogActions>
	</form>
	</>
);

const styles = theme => ( {
	loadingRoot: {
		margin: 64
	}
} );

let PasswordModal = ( { classes, show, loading, handleClose, ...rest } ) => (
	<Dialog open={ show } onClose={ handleClose } TransitionComponent={ Transition } >
		
		{ loading ? 
				<CircularProgress color='primary' classes={ { root: classes.loadingRoot } } /> : 
				<JoinGameForm { ...rest } handleClose={ handleClose } /> }

	</Dialog>
);

PasswordModal = withStyles( styles )( PasswordModal );

export default connect(
	passwordModalUISelectors.getProps,
	mapDispatchToProps
)( PasswordModal );