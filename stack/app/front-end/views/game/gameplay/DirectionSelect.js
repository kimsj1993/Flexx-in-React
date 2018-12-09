import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const directionStyles = theme => ( {

} );

let Direction = ( { classes, direction } ) => (
	<Paper>

		<div/>

		<Typography> { direction } </Typography>
		
	</Paper>
);

Direction = withStyles( directionStyles )( Direction );


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

const DirectionSelect = ( { classes, direction, selected, handleClick } ) => (
	<Paper classes={ { root: selected ? classes.selectedRoot: classes.root } } elevation={ selected ? 8 : 0 } >
		<Direction direction={ direction } />
	</Paper>
);

export default withStyles( styles )( DirectionSelect );