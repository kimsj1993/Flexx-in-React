import { connect } from 'react-redux';

import { userSelectors } from '../../../../state/modules/data/user';
import { playersSelectors } from '../../../../state/modules/data/players';

import Table from './Table';

const mapStateToProps = (state, ownProps) => {
	const userId = userSelectors.getUserId( state );
	const keeperIds = tableSelectors.getPlayerKeeperIds( state, userId );
	
	return { keeperIds };
};

const TableContainer = (props) => (
	<Table {...props} />
);

export default connect(
	mapStateToProps
)(TableContainer);