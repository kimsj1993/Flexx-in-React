import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import CardContainer from '../card/CardContainer';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	root: {
		minWidth: 128,
		borderRadius: 8,
		backgroundColor: '#d8c4da',
		marginRight: 16,
		position: 'relative'
	},
	label: {
		position: 'absolute',
		top: 80,
		width: '100%',
		textAlign: 'center',
		color: '#a57ca9'
	},
	card: {
		transform: 'rotate( 2deg )'
	},
	button: {
		position: 'absolute',
		height: 48,
		top: 73,
		marginLeft: 'auto',
		marginRight: 'auto',
		width: 96,
		left: 16
	}
});

const Discard = ({ classes, cards, ids, browseDiscards }) => (
	<div className={ classes.root } >
		{ ids.map(id => (
			
			<div className={ classes.card } ><CardContainer id={ id } noinfo /></div>

			))[cards.length - 1] }

		{ ids.length == 0 ? <Typography variant='h6' classes={ { root: classes.label } } >
			DISCARDS
		</Typography> : '' }

		{ ids.length != 0 ? 
				<Button 
					classes={ { root: classes.button } } 
					variant='contained' 
					color='primary' 
					onClick={ browseDiscards } 
				> 
					Browse 
				</Button>
			:
				''
		}
	</div>
);

export default withStyles(styles)(Discard);