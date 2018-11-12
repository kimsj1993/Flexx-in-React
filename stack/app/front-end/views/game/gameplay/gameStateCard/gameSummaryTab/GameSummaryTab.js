import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import MainRule from '../MainRule';
import SummaryGoal from './SummaryGoal';

const styles = theme => ({
	root: {
		padding: 8,
		backgroundColor: theme.palette.common.white,
		height: '100%'
	},
	mainRules: {
		display: 'flex',
		marginBottom: 16
	},
	goalTitleRoot: {
		height: 24,
		width: '100%',
		margin: '22px 0'
	},
	goals: {
		display: 'flex',
		justifyContent: 'center'
	}
});

const GameSummaryCard = ({ classes, drawRule, playRule, handLimit, keeperLimit, goals }) => (
	<Paper classes={{ root: classes.root }} >
		<div className={ classes.mainRules } >
			<MainRule name='Draw' value={ drawRule } />
			<MainRule name='Play' value={ playRule } />
			<MainRule name='Hand Limit' value={ handLimit } />
			<MainRule name='Keeper Limit' value={ keeperLimit } />
		</div>
		<Divider />
		<Typography align='center' variant='subtitle2' classes={{ root: classes.goalTitleRoot }} >
			Goal
		</Typography>
		<div className={ classes.goals } >
			{ goals.map((props, index) => (<SummaryGoal {...props} key={ index } />)) }
		</div>
	</Paper>
);

export default withStyles(styles)(GameSummaryCard);