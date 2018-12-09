import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';

const styles = theme => ( {
	root: {
		borderRadius: 4,
		position: 'relative',
		minHeight: 144,
		width: '50%',
		padding: 16,

		'&:hover': {
			backgroundColor: theme.palette.cards.goal
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
		backgroundColor: theme.palette.cards.goal,
		height: 40,
		width: 40,
		marginTop: 4,
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	label: {
		marginTop: 8,
		fontSize: '14px',
		fontWeight: 500
	},
	req: {
		fontSize: '12px',
		fontWeight: 400
	},
	text: {
		textAlign: 'center',
		height: 24,
		width: '100%',
		color: theme.palette.cards.goal
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

let Goal = ( { classes, label, requirements, showInfo = () => {} } ) => (
	<div className={ classes.root } >

		<div className={ classes.icon } />

		<Typography classes={ {
			root: classNames( classes.text, classes.label )
		} } > { label } </Typography>

		<Typography classes={ {
			root: classNames( classes.text, classes.req )
		} } > { requirements } </Typography>

		<IconButton classes={ { 
			root: classNames( classes.text, classes.info )
		} } onClick={ showInfo } >
			<InfoIcon />
		</IconButton>

	</div>
);

export default withStyles( styles )( Goal );