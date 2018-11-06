import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		height: 192,
		width: 128,
		borderRadius: 8,
		backgroundColor: theme.palette.common.white,
		display: 'flex'
	},
	keeper: {
		width: 36,
		height: '100%',
		borderRadius: '8px 0 0 8px',
		backgroundColor: theme.palette.cards.keeper
	},
	goal: {
		width: 36,
		height: '100%',
		borderRadius: '8px 0 0 8px',
		backgroundColor: theme.palette.cards.goal
	},
	rule: {
		width: 36,
		height: '100%',
		borderRadius: '8px 0 0 8px',
		backgroundColor: theme.palette.cards.rule
	},
	action: {
		width: 36,
		height: '100%',
		borderRadius: '8px 0 0 8px',
		backgroundColor: theme.palette.cards.action
	}
});

const Card = ({ classes, name, type }) => (
	<Paper classes={{ root: classes.root }} >
		<div className={classes[type]} />
		<div>
			<Typography variant='body2' align='center'>
				{ name }
			</Typography>
		</div>

	</Paper>
);

export default withStyles(styles)(Card);