import { withStyles } from '@material-ui/core/styles';

import DeckContainer from './DeckContainer';
import HandContainer from './HandContainer';
import DiscardContainer from './DiscardContainer';
import PlayerKeepers from '../KeepersContainer';

const styles = theme => ({
	root: {
		height: 72,
		width: 100,
		display: 'flex'
	}
});

const Table = ({ classes, keeperIds }) => (
	<div className={ classes.root } >
		<div>
			<DiscardContainer />
		</div>
		<div>
			<DeckContainer />
		</div>
		<div>
			<HandContainer />
		</div>
		<div>
			<PlayerKeepers keeperIds={ keeperIds } />
		</div>
	</div>
);

export default withStyles(styles)(Table);