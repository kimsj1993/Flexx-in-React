import { connect } from 'react-redux';

import Discard from './Discard';

const mapStateToProps = (state, ownProps) => {
	const { discards } = state.data;

	const cards = discards.map(({ id, type }) => {
		const data = state.data[type + 's'][id];

		return { id, type };
	});
	
	return { cards };
};

const DiscardContainer = (props) => (
	<Discard {...props} />
);

export default connect(
	mapStateToProps
)(DiscardContainer);