import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = ( state, ownProps ) => ( {
	player: state.data.users.byId[ ownProps.id ]
} );

const playerStyles = theme => ( {
	root: {
		padding: 16
	},
	icon: {
		borderRadius: '50%',
		height: 64,
		width: 64,
		marginBottom: 16,
		marginLeft: 'auto',
		marginRight: 'auto',
		backgroundColor: theme.palette.primary.main
	},
	name: {
		fontSize: '16px',
		fontWeight: 400,
		color: theme.palette.primary.main,
		textAlign: 'center',
		width: '100%'
	}
} );

let Player = ( { classes, name } ) => (
	<Paper classes={ { root: classes.root } } >

		<div className={ classes.icon } />

		<Typography classes={ { root: classes.name } } > { name } </Typography>
		
	</Paper>
);

Player = withStyles( playerStyles )( Player );


const styles = theme => ( {
	root: {
		margin: 32,

		'&:hover': {
			margin: 0,
			padding: 32,
			backgroundColor: theme.palette.grey[ 400 ]
		}
	},

	selectedRoot: {
		padding: 32,
		backgroundColor: theme.palette.primary.light
	}
} )

let PlayerSelect = ( { classes, player, selected, handleClick } ) => (
	<Paper classes={ { root: selected ? classes.selectedRoot: classes.root } } elevation={ selected ? 8 : 0 } >
		<Player name={ player.username } />
	</Paper>
);

PlayerSelect = withStyles( styles )( PlayerSelect );

export default connect(
	mapStateToProps
)( PlayerSelect );