import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';


const directionStyles = theme => ( {
	icon: {
		height: 80,
		width: 80,
		color: 'inherit',
		backgroundColor: theme.palette.grey[ 100 ],
		borderRadius: '50%',
	}
} );

let Direction = ( { classes, direction } ) => (
	<>

		{ direction == 'LEFT' && <RotateLeftIcon classes={ { root: classes.icon } } /> }

		{ direction == 'RIGHT' && <RotateRightIcon classes={ { root: classes.icon } } /> }
		
	</>
);

Direction = withStyles( directionStyles )( Direction );


const styles = theme => ( {
	root: {
		margin: 32,
		color: theme.palette.primary.main,
		backgroundColor: theme.palette.grey[ 300 ],

		'&:hover': {
			margin: 0,
			padding: 32,
			backgroundColor: theme.palette.grey[ 400 ],
			color: theme.palette.secondary.dark
		}
	},

	selectedRoot: {
		padding: 32,
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.secondary.dark
	}
} )

const DirectionSelect = ( { classes, direction, selected, handleClick } ) => (
	<Paper classes={ { root: selected ? classes.selectedRoot: classes.root } } elevation={ selected ? 8 : 0 } >
		<Direction direction={ direction } />
	</Paper>
);

export default withStyles( styles )( DirectionSelect );