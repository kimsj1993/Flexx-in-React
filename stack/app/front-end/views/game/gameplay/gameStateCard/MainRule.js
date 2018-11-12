import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const styles = ({
	root: {
		height: 72,
		width: 100
	},
	ruleRoot: {
		height: 24,
		width: '100%',
		marginTop: 10
	},
	valueRoot: {
		height: 24,
		width: '100%'
	}
});

const MainRule = ({ classes, name, value }) => (
	<div className={ classes.root } >
		<Typography classes={{ root: classes.ruleRoot }} variant='subtitle2' align='center'>
			{ name }
		</Typography>
		<Typography classes={{ root: classes.valueRoot }} variant='h6' align='center'>
			{ value }
		</Typography>
	</div>
);

export default withStyles(styles)(MainRule);