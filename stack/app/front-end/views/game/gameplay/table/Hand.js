import { withStyles } from '@material-ui/core/styles';

import CardContainer from '../CardContainer';

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

const Hand = ({ classes, cards }) => (
	<div className={ classes.root } >
		{ cards.map((props, index) => (<div className={ classes.card } key={ index } ><CardContainer {...props} /></div>)) }
	</div>
);

export default withStyles(styles)(Hand);