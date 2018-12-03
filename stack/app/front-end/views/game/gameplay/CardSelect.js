import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import CardContainer from './card/CardContainer';

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

const CardSelect = ( { classes, cardId, selected, handleClick } ) => (
	<Paper classes={ { root: selected ? classes.selectedRoot: classes.root } } elevation={ selected ? 8 : 0 } >
		<CardContainer id={ cardId } />
	</Paper>
);

export default withStyles( styles )( CardSelect );