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
	}
});

const CardBack = ({ classes, count }) => (
	<Paper classes={{ root: classes.root }} >
		''
	</Paper>
);

export default withStyles(styles)(CardBack);