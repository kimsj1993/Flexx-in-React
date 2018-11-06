import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		height: 194,
		width: 128,
		borderRadius: 8,
		backgroundColor: theme.palette.common.white,
		display: 'flex'
	},
	sash: {
		height: 194,
		width: 36,
		backgroundColor: theme.palette.cards.goal,
		borderRadius: '8px 0 0 8px'
	}
});

const Card = ({ classes, type, subtype, name }) => (
	<Paper classes={{ root: classes.root }} >
		<div className={ classes.sash }>

		</div>
		<div>

		</div>
	</Paper>
);

export default withStyles(styles)(Card);