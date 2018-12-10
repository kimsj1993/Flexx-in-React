import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	root: {
		display: 'flex'
	},
	avatar: {
		width: 48,
		height: 48,
		backgroundColor: theme.palette.grey[100],
		marginRight: 8
	},
	avatarTurn: {
		backgroundColor: '#fcf295'
	},
	name: {
		height: 20,
		marginBottom: 8
	},
	plays: {
		height: 20
	}
});

const UserInfo = ( { classes, name, playsRemaining, isTurn } ) => (
	<div className={ classes.root } >
		<Avatar className={ classNames( classes.avatar, { [ classes.avatarTurn ]: isTurn } ) } />
		<div>
			<Typography className={ classes.name } variant='h6'>{ name }</Typography>
			<Typography className={ classes.plays } variant='body2'>
				{ (isTurn) ? playsRemaining + ' plays remaining.' : ''}
			</Typography>
		</div>
	</div>
);

export default withStyles(styles)(UserInfo);