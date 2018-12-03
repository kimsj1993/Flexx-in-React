import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

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

import { logoutModalUISelectors, logoutModalUIOperations, logoutModalUITypes } from '../state/modules/ui/logout-modal';
import { apiOperations } from '../state/modules/api';

const Transition = props => <Slide direction='down' { ...props } />;

const mapDispatchToProps = dispatch => ( {
	handleClose: () => dispatch( logoutModalUIOperations.hideDialog() ),
	logout: e => {
		e.preventDefault();
		dispatch( apiOperations.deleteSession( { 
			types: [
				logoutModalUITypes.LOGOUT_REQUEST,
				logoutModalUITypes.HIDE_DIALOG,
				logoutModalUITypes.LOGOUT_ERROR
			]
		} ) );
	}
} );

const LogoutForm = ( {
	value, error, handleClose, id, logout
} ) => (
	<>
	<DialogTitle>Join Game</DialogTitle>
	<form onSubmit={ logout } >
		<DialogContent>

			<DialogContentText>
				Are you sure you want to log out?
			</DialogContentText>
			{ error ? <DialogContentText color='error'>{ error }</DialogContentText> : '' }
		</DialogContent>
		<DialogActions>
			<Button onClick={ handleClose }>
				Cancel
			</Button>
			<Button type='submit' color='primary'>
				Log Out
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

let LogoutModal = ( { classes, show, loading, handleClose, ...rest } ) => (
	<Dialog open={ show } onClose={ handleClose } TransitionComponent={ Transition } >
		
		{ loading ? 
				<CircularProgress color='primary' classes={ { root: classes.loadingRoot } } /> : 
				<LogoutForm { ...rest } handleClose={ handleClose } /> }

	</Dialog>
);

LogoutModal = withStyles( styles )( LogoutModal );

export default connect(
	logoutModalUISelectors.getProps,
	mapDispatchToProps
)( LogoutModal );