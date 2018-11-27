import { connect } from 'react-redux';

import { userSelectors } from '../../../../state/modules/user';
import { playersSelectors } from '../../../../state/modules/data/players';

import Table from './Table';

const mapStateToProps = (state, ownProps) => {
	const userId = userSelectors.getUserId( state );
	const keeperIds = playersSelectors.getPlayerKeeperIds( state, userId );
	
	return { keeperIds };
};

const TableContainer = (props) => (
	<Table {...props} />
);

export default connect(
	mapStateToProps
)(TableContainer);