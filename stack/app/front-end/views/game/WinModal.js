import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { winModalUISelectors, winModalUIOperations } from '../../state/modules/ui/win-modal';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

const Transition = props => <Slide direction='down' { ...props } />;

const mapDispatchToProps = dispatch => ( {
	handleClose: () => dispatch( winModalUIOperations.hideModal() )
} );

const styles = theme => ( {
	root: {

	}
} );

let WinModal = ( { classes, show, winner, handleClose } ) => (
	<Dialog open={ show } onClose={ handleClose } TransitionComponent={ Transition } >
		
		<section className={ classes.root } >

			<Typography> { winner && winner.username } wins! </Typography>

		</section>

	</Dialog>
);

WinModal = withStyles( styles )( WinModal );

export default connect(
	winModalUISelectors.getProps,
	mapDispatchToProps
)( WinModal );