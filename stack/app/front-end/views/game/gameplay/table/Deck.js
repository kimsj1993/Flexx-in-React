import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		height: 192,
		width: 128,
		borderRadius: 8,
		border: '8px solid white',
		backgroundColor: theme.palette.primary.dark,
		position: 'relative'
	},
	count: {
		height: 20,
		width: 20,
		top: 16,
		left: 16,
		fontFamily: "'Roboto Condensed', sans-serif",
		fontSize: 20,
		fontWeight: 600,
		color: theme.palette.common.white,
		position: 'absolute'
	},
	label: {
		position: 'absolute',
		top: 72,
		width: '100%',
		textAlign: 'center',
		color: '#805184'
	}
});

const Deck = ({ classes, count }) => (
	<Paper classes={{ root: classes.root }} >
		<Typography classes={{ root: classes.count }} variant='subtitle2' align='center'>
			{ count }
		</Typography>

		<Typography variant='h6' classes={ { root: classes.label } } >
			DECK
		</Typography>
	</Paper>
);

export default withStyles(styles)(Deck);