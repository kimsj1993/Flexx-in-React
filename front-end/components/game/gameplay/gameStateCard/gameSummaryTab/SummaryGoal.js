import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
	root: {
		height: 120,
		width: 200
	},
	iconContainer: {
		width: '100%'
	},
	iconRoot: {
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 20,
		marginBottom: 4,
		height: 40,
		width: 40,
		backgroundColor: theme.palette.cards.goal
	},
	goalRoot: {
		color: theme.palette.cards.goal,
		height: 24,
		width: '100%',
		fontSize: 14
	},
	reqRoot: {
		color: theme.palette.cards.goal,
		height: 32,
		width: '100%',
		fontSize: 12
	}
});

const SummaryGoal = ({ classes, imageUrl, name, requirements }) => (
	<div className={ classes.root } >
		<div className={ classes.iconContainer } >
			<Avatar src={ imageUrl } classes={{ root: classes.iconRoot }} />
		</div>
		<Typography classes={{ root: classes.goalRoot }} variant='subtitle2' align='center'>
			{ name }
		</Typography>
		<Typography classes={{ root: classes.reqRoot }} variant='h6' align='center'>
			{ requirements }
		</Typography>
	</div>
);

export default withStyles(styles)(SummaryGoal);