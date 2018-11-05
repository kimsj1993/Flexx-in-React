import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	root: {
		display: 'flex'
	},
	avatar: {
		width: 48,
		height: 48
	},
	name: {
		height: 20,
		paddingottom: 8
	},
	plays: {
		height: 20
	}
});

const UserInfo = ({ classes, imageUrl, name, playRemaining, isTurn }) => (
	<div className={ classes.root } >
		<Avatar src={ imageUrl } className={ classes.avatar } />
		<div>
			<Typography className={ classes.name } variant='h6'>{ name }</Typography>
			<Typography className={ classes.plays } variant='body2'>
				{ (isTurn) ? playRemaining + ' plays remaining.' : ''}
			</Typography>
		</div>
	</div>
);

export default withStyles(styles)(UserInfo);