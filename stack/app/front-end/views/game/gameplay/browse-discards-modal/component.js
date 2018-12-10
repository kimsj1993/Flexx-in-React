import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import CardContainer from '../card/CardContainer';

const Transition = props => <Slide direction='down' { ...props } />;


const cardWellStyles = theme => ( {
	root: {
		display: 'flex',
		overflowX: 'scroll'
	},

	card: {
		padding: 32,

		'&:hover': {
			backgroundColor: theme.palette.grey[ 200 ]
		}
	},

	selected: {
		backgroundColor: theme.palette.primary.main,
	}
} );

let CardWell = ( { classes, discards, selectedId, showDetails } ) => (
	<section className={ classes.root } >
		{ discards.map( id => 
			<div className={ classNames( classes.card, { [ classes.selected ]: id == selectedId } ) } >
				<CardContainer id={ id } onClick={ showDetails( { id, selected: id == selectedId } ) } noinfo />
			</div> 
		) }
	</section>
);

CardWell = withStyles( cardWellStyles )( CardWell );



const styles = theme => ( {
	
} );

const Component = ( { classes, show, selectedId, discards, handleClose, showDetails } ) => {

	return (

		<Dialog open={ show } onClose={ handleClose } TransitionComponent={ Transition } >

			<DialogTitle> Browse Discards </DialogTitle>

			<DialogContent>

				<CardWell discards={ discards } selectedId={ selectedId } showDetails={ showDetails } />

			</DialogContent>

			<DialogActions>

				<Button color='primary' onClick={ handleClose } >
					Close
				</Button>

			</DialogActions>

		</Dialog>
	)

};

export default withStyles( styles )( Component );

