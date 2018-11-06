import { connect } from 'react-redux';

import Table from './Table';

const mapStateToProps = (state, ownProps) => {
	const { keeperIds } = state.data.game.playerData;
	
	return { keeperIds };
};

const TableContainer = (props) => (
	<Table {...props} />
);

export default connect(
	mapStateToProps
)(TableContainer);