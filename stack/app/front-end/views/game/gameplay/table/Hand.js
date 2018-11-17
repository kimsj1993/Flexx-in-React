import { withStyles } from '@material-ui/core/styles';

import Card from '../card/Card';

const styles = theme => ({
	root: {
		display: 'flex'
	},
	card: {
		marginRight: -92,

		'&:hover': {
			marginRight: 0
		}
	}
});

const Hand = ({ classes, cards, playCard }) => (
	<div className={ classes.root } >
		{ cards.map((card, index) => (<div className={ classes.card } key={ index } onClick={ playCard( card.id ) } ><Card { ...card } /></div>)) }
	</div>
);

export default withStyles(styles)(Hand);