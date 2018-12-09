import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';

const styles = theme => ( {
	root: {
		borderRadius: 4,
		position: 'relative',
		minWidth: 100,
		minHeight: 72,

		'&:hover': {
			backgroundColor: '#F6BA08'
		},

		'&:hover $text': {
			color: theme.palette.common.white
		}
	},
	label: {
		marginTop: 10,
		fontSize: '14px',
		fontWeight: 500,
		color: theme.palette.grey[ 800 ]
	},
	count: {
		fontSize: '20px',
		fontWeight: 500
	},
	text: {
		textAlign: 'center',
		height: 24,
		width: '100%'
	},
	info: {
		position: 'absolute',
		bottom: 4,
		right: 4,
		color: theme.palette.common.white,
		height: 24,
		width: 24,
		padding: 0
	}
} );

let Rule = ( { classes, count, label, showInfo = () => {} } ) => (
	<div className={ classes.root } >

		<Typography classes={ {
			root: classNames( classes.text, classes.label )
		} } > { label } </Typography>

		<Typography classes={ {
			root: classNames( classes.text, classes.count )
		} } > { count || '—' } </Typography>

		<IconButton classes={ { 
			root: classNames( classes.text, classes.info )
		} } onClick={ showInfo } >
			<InfoIcon />
		</IconButton>

	</div>
);

export default withStyles( styles )( Rule );