import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { passwordModalUISelectors, passwordModalUIOperations } from '../../../state/modules/ui/password-modal';
import { lobbyOperations } from '../../../state/modules/data/lobby';

import Button from '@material-ui/core/Button';
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
	joinGame: ( { id, password }) => () => dispatch( lobbyOperations.joinGame( { id, password } ) ),
	handleInputChange: e => dispatch( passwordModalUIOperations.updateTextField( { value: e.target.value } ) )
} );

const styles = theme => ( {
	root: {
		
	}
} );

let PasswordModal = ( { classes, show, value, error, errorText, handleClose, handleInputChange, id, joinGame } ) => (
	<Dialog open={ show } onClose={ handleClose } TransitionComponent={ Transition } >
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
	            	id="name"
	            	label='Password'
	            	type="password"
	            	value={ value }
	            	onChange={ handleInputChange }
	            	helperText={ error ? errorText : 'Please enter the correct password.'}
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
	</Dialog>
);

PasswordModal = withStyles( styles )( PasswordModal );

export default connect(
	passwordModalUISelectors.getProps,
	mapDispatchToProps
)( PasswordModal );