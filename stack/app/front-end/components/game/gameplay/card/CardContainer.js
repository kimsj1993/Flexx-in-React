import { connect } from 'react-redux';

import Card from './Card';

const mapStateToProps = (state, ownProps) => {
	const { type, id } = ownProps;

	const { name, subtype } = state.data[type];

	return {
		type,
		name,
		subtype
	};
}

const CardContainer = (props) => (
	<Card {...props} />
);

export default connect(
	mapStateToProps
)(CardContainer);