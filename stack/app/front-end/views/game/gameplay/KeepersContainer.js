import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { cardsOperations, cardsSelectors } from '../../../state/modules/data/cards';

import Keeper from './Keeper';

const mapStateToProps = (state, ownProps) => {
	const { keeperIds } = ownProps;

	const keepers = keeperIds.map( id => cardsSelectors.getCardById( state, id ) );

	return {
		keepers
	};
}

const styles = theme => ({
	root: {
		maxHeight: 208,
		height: 208,
		overflow: 'scroll',
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 128px)',
		gridAutoRows: '32px'
	}
});

const PlayerKeepers = ({ classes, keepers }) => (
	<div className={ classes.root } >
		{ keepers.map(({ name }, index) => (
			<Keeper name={ name } key={ index } />
		))}
	</div>
);

export default connect(
	mapStateToProps
)(withStyles(styles)(PlayerKeepers));