import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';

import Rule from './rule';


const noRulesStyles = theme => ( {
	root: {
		color: theme.palette.text.hint,
		textAlign: 'center',
		fontSize: '14px',
		fontWeight: 500,
		textAlign: 'center',
		width: '100%',
		height: 160,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 32,
	}
} );

let NoRules = ( { classes } ) => (
	<Typography classes={ { root: classes.root } } > 
		Rules in play besides the main rules (above) will appear here. Play Rule cards to put new Rules in play.
	</Typography>
);

NoRules = withStyles( noRulesStyles )( NoRules );


const styles = theme => ( {
	root: {
		width: '100%',
		padding: 16,
		height: 160,
		overflowY: 'scroll',
		maxHeight: 160
	},

	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat( 4, 1fr )',
		gridAutoRows: '84px',
		width: '100%'
	}
} );

const Component = ( { classes, rules = [], showRuleInfo = () => {} } ) => (
	<div className={ classes.root } >

		<div className={ classes.grid } >
		{ rules.map( goal => 
			<Rule name={ goal.name } showInfo={ showRuleInfo( goal.id ) } /> 
		) }
		</div>

		{ rules.length == 0 && <NoRules /> }
	</div>
);

export default withStyles( styles )( Component );