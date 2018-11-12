import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		height: 192,
		width: 128,
		borderRadius: 8,
		border: '8px solid white',
		backgroundColor: theme.palette.primary.dark
	},
	count: {
		height: 20,
		marginTop: 22,
		width: 64,
		color: theme.palette.common.white
	}
});

const Deck = ({ classes, count }) => (
	<Paper classes={{ root: classes.root }} >
		<Typography classes={{ root: classes.count }} variant='subtitle2' align='center'>
			{ count }
		</Typography>
	</Paper>
);

export default withStyles(styles)(Deck);