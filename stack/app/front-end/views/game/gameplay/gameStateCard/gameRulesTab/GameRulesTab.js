import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import MainRule from '../MainRule';
import Rule from './Rule';

const styles = theme => ({
	root: {
		padding: 8,
		backgroundColor: theme.palette.common.white
	},
	rules: {
		display: 'flex',
		height: 72
	},
	titleRoot: {
		height: 24,
		width: '100%',
		margin: '8px 0'
	},
	goals: {
		display: 'flex',
		justifyContent: 'center'
	}
});

const GameSummaryCard = ({ classes, drawRule, playRule, handLimit, keeperLimit, 
	actionRules, bonusRules, gameplayRules }) => (
	<Paper classes={{ root: classes.root }} >
		<Typography align='center' variant='subtitle2' classes={{ root: classes.titleRoot }} >
			Main Rules
		</Typography>
		<div className={ classes.rules } >
			<MainRule name='Draw' value={ drawRule } />
			<MainRule name='Play' value={ playRule } />
			<MainRule name='Hand Limit' value={ handLimit } />
			<MainRule name='Keeper Limit' value={ keeperLimit } />
		</div>
		{ 
			actionRules.length != 0

			&& 

			<>
			<Typography align='center' variant='subtitle2' classes={{ root: classes.titleRoot }} >
				Action Rules
			</Typography>
			<div className={ classes.rules } >
				{ actionRules.map(props => (<Rule {...props} />)) }
			</div>
			</>
		}

		{
			gameplayRules.length != 0

			&&

			<>
			<Typography align='center' variant='subtitle2' classes={{ root: classes.titleRoot }} >
			Gameplay Rules
			</Typography>
			<div className={ classes.rules } >
				{ gameplayRules.map(props => (<Rule {...props} />)) }
			</div>
			</>
		}

		{
			bonusRules.length != 0

			&&

			<>
			<Typography align='center' variant='subtitle2' classes={{ root: classes.titleRoot }} >
			Bonus Rules
			</Typography>
			<div className={ classes.rules } >
				{ bonusRules.map(props => (<Rule {...props} />)) }
			</div>
			</>
		}
		
	</Paper>
);

export default withStyles(styles)(GameSummaryCard);