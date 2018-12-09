import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import CardContainer from './card/CardContainer';
import CardBack from './CardBack';

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

const CardSelect = ( { classes, cardId, selected, handleClick, index } ) => (
	<Paper classes={ { root: selected ? classes.selectedRoot: classes.root } } elevation={ selected ? 8 : 0 } >
		{ !index && <CardContainer id={ cardId } /> }
		{ index && <CardBack /> }
	</Paper>
);

export default withStyles( styles )( CardSelect );