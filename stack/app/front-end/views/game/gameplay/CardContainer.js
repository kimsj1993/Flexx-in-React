import { connect } from 'react-redux';

import Card from './Card';

const mapStateToProps = (state, ownProps) => {
	const { type, id } = ownProps;

	const data = state.data[type + 's'][id];

	const { name } = data;
	
	return { type, name };
};

const CardContainer = (props) => (
	<Card {...props} />
);

export default connect(
	mapStateToProps
)(CardContainer);