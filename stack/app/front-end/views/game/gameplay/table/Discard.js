import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import CardContainer from '../card/CardContainer';
import Typography from '@material-ui/core/Typography';

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
	}
});

const Discard = ({ classes, cards, ids }) => (
	<div className={ classes.root } >
		{ ids.map(id => (<CardContainer id={ id } />))[cards.length - 1] }

		{ ids.length == 0 ?<Typography variant='h6' classes={ { root: classes.label } } >
			DISCARDS
		</Typography> : '' }
	</div>
);

export default withStyles(styles)(Discard);