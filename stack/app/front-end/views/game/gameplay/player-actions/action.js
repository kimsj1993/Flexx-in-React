import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';

const styles = theme => ( {
	root: {
		borderRadius: 4,
		position: 'relative',
		padding: 16,
		height: 128,
		width: 128,

		'&:hover': {
			backgroundColor: theme.palette.cards.action
		},

		'&:hover $text': {
			color: theme.palette.common.white
		},

		'&:hover $icon': {
			backgroundColor: theme.palette.common.white
		}
	},
	icon: {
		borderRadius: '50%',
		backgroundColor: theme.palette.cards.action,
		height: 40,
		width: 40,
		marginTop: 24 - 16,
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	label: {
		marginTop: 4,
		fontSize: '14px',
		fontWeight: 500
	},
	text: {
		textAlign: 'center',
		width: '100%',
		color: theme.palette.cards.action
	},
	info: {
		position: 'absolute',
		top: 4,
		right: 4,
		color: theme.palette.common.white,
		height: 24,
		width: 24,
		padding: 0
	}
} );

let Action = ( { classes, label, showInfo = () => {}, invoke = () => {} } ) => (
	<div className={ classes.root } onClick={ invoke } >

		<div className={ classes.icon } />

		<Typography classes={ {
			root: classNames( classes.text, classes.label )
		} } > { label } </Typography>

		<IconButton classes={ { 
			root: classNames( classes.text, classes.info )
		} } onClick={ showInfo } >
			<InfoIcon />
		</IconButton>

	</div>
);

export default withStyles( styles )( Action );