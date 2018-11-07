import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
	root: {
		height: 72,
		width: 100
	},
	iconRoot: {
		margin: '10px auto 0 auto',
		height: 40,
		width: 40,
		backgroundColor: theme.palette.grey[200]
	},
	ruleRoot: {
		height: 24,
		marginTop: 4,
		width: '100%'
	},
	valueRoot: {
		height: 24,
		width: '100%'
	}
});

const MainRule = ({ classes, name, imageUrl }) => (
	<div className={ classes.root } >
		<Avatar src={ imageUrl } classes={{ root: classes.iconRoot }} />
		<Typography classes={{ root: classes.ruleRoot }} variant='subtitle2' align='center'>
			{ name }
		</Typography>
	</div>
);

export default withStyles(styles)(MainRule);