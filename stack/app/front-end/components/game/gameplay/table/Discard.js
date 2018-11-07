import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import CardContainer from '../CardContainer';

const styles = theme => ({
	root: {
		
	}
});

const Discard = ({ classes, cards }) => (
	<div>
		{ cards.map(props => (<CardContainer {...props} />))[cards.length - 1] }
	</div>
);

export default withStyles(styles)(Discard);