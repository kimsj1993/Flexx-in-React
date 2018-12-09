import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';

import Goal from './goal';


const noGoalsStyles = theme => ( {
	root: {
		color: theme.palette.text.hint,
		textAlign: 'center',
		fontSize: '14px',
		fontWeight: 500,
		textAlign: 'center',
		width: '100%',
		height: 144,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 32,
	}
} );

let NoGoals = ( { classes } ) => (
	<Typography classes={ { root: classes.root } } > 
		Play a Goal card to add a goal. Goals currently in play will appear here. Satisfy a goal to win!
	</Typography>
);

NoGoals = withStyles( noGoalsStyles )( NoGoals );


const oneGoalStyles = theme => ( {
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '50%',
		padding: 16,
		paddingLeft: 20,
		paddingRight: 20,
		color: '#ec8dbf',
		textAlign: 'center',
		fontSize: '14px',
		fontWeight: 500,
		borderRadius: 4
	}
} );

let OneGoal = ( { classes } ) => (
	<Typography classes={ { root: classes.root } } > 
		Play the 'Double Agenda' Rule card to enable a second goal. Satisfy either to win the game!
	</Typography>
);

OneGoal = withStyles( oneGoalStyles )( OneGoal );


const styles = theme => ( {
	root: {
		display: 'flex',
		width: '100%',
		padding: 16,

		'& > :nth-child( 2 )': {
			borderLeft: '1px solid #fbe3f0'
		}
	}
} );

const Component = ( { classes, goals = [], showGoalInfo = () => {} } ) => (
	<div className={ classes.root } >

		{ goals.map( goal => 
			<Goal label={ goal.name } requirements={ goal.requirements } showInfo={ showGoalInfo( goal.id ) } /> 
		) }

		{ goals.length == 0 && <NoGoals /> }

		{ goals.length == 1 && <OneGoal /> }
	</div>
);

export default withStyles( styles )( Component );