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
			backgroundColor: theme.palette.primary.main
		},

		'&:hover $text': {
			color: theme.palette.common.white
		},

		'&:hover $icon': {
			backgroundColor: theme.palette.common.white
		},

		'&:first-child': {
			borderRight: '1px solid #efe7ef',
			borderBottom: '1px solid #efe7ef'

		},

		'&:nth-child( 2 )': {
			borderRight: '1px solid #fbe3f0',
			borderBottom: '1px solid #efe7ef'
		},

		'&:nth-child( 3 )': {
			borderBottom: '1px solid #efe7ef'
		},

		'&:nth-child( 4 )': {
			borderRight: '1px solid #efe7ef'
		},

		'&:nth-child( 5 )': {
			borderRight: '1px solid #efe7ef'
		}
	},
	icon: {
		borderRadius: '50%',
		backgroundColor: theme.palette.primary.main,
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