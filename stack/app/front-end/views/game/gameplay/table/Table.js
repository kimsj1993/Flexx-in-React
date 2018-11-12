import { withStyles } from '@material-ui/core/styles';

import DeckContainer from './DeckContainer';
import HandContainer from './HandContainer';
import DiscardContainer from './DiscardContainer';
import PlayerKeepers from '../KeepersContainer';

const styles = theme => ({
	root: {
		height: 72,
		width: '100%',
		display: 'flex',
		marginTop: 16
	},
	discard: {
		marginRight: 16
	},
	deck: {
		marginRight: 16
	},
	hand: {
		flexGrow: 2
	},
	keepers: {
		width: 416
	},
	center: {
		display: 'flex',
		justifyContent: 'center'
	}
});

const Table = ({ classes, keeperIds }) => (
	<div className={ classes.root } >
		<div className={ classes.discard } >
			<DiscardContainer />
		</div>
		<div className={ classes.deck } >
			<DeckContainer />
		</div>
		<div className={ classes.hand } >
			<div className={ classes.center }>
				<HandContainer />
			</div>
		</div>
		<div className={ classes.keepers } >
			<div className={ classes.center }>
				<PlayerKeepers keeperIds={ keeperIds } />
			</div>
		</div>
	</div>
);

export default withStyles(styles)(Table);