import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const playerStyles = theme => ( {

} );

let Player = ( { classes, name } ) => (
	<Paper>

		<div/>

		<Typography> { name } </Typography>
		
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

const PlayerSelect = ( { classes, name, selected, handleClick } ) => (
	<Paper classes={ { root: selected ? classes.selectedRoot: classes.root } } elevation={ selected ? 8 : 0 } >
		<Player name={ name } />
	</Paper>
);

export default withStyles( styles )( PlayerSelect );