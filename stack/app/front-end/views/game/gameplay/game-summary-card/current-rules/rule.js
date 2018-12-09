import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';

const styles = theme => ( {
	root: {
		borderRadius: 4,
		position: 'relative',
		padding: 8,

		'&:hover': {
			backgroundColor: theme.palette.primary.main
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
		backgroundColor: theme.palette.primary.main,
		height: 32,
		width: 32,
		marginTop: 4,
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	label: {
		marginTop: 8,
		fontSize: '12px',
		fontWeight: 500
	},
	text: {
		textAlign: 'center',
		height: 20,
		width: '100%',
		color: theme.palette.primary.main
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

const Rule = ( { classes, name, showInfo = () => {} } ) => (
	<div className={ classes.root } >

		<div className={ classes.icon } />

		<Typography classes={ {
			root: classNames( classes.text, classes.label )
		} } > { name } </Typography>

		<IconButton classes={ { 
			root: classNames( classes.text, classes.info )
		} } onClick={ showInfo } >
			<InfoIcon />
		</IconButton>

	</div>
);

export default withStyles( styles )( Rule );