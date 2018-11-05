import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Keeper from './Keeper';

const mapStateToProps = (state, ownProps) => {
	const { keeperIds } = ownProps;

	const { keepers } = state.data;

	const keeperData = keeperIds.map(id => keepers[id]);

	return {
		keeperData
	};
}

const styles = theme => ({
	root: {
		maxHeight: 208,
		overflow: 'scroll',
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 128px)',
		gridAutoRows: 32
	}
});

const PlayerKeepers = ({ classes, keeperData }) => (
	<div className={ classes.root } >
		{ keeperData.map({ name, imageUrl } => (
			<Keeper name={ name } imageUrl={ imageUrl } />
		))}
	</div>
);

export default connect({
	mapStateToProps
})(withStyles(styles)(PlayerKeepers));