import { connect } from 'react-redux';

import { userSelectors } from '../../../../state/modules/user';
import { playersSelectors } from '../../../../state/modules/data/players';
import { gameSelectors, gameOperations } from '../../../../state/modules/data/game';


import Table from './Table';
import * as usersSelectors from "../../../../state/modules/data/users/selectors";

const mapStateToProps = (state, ownProps) => {
    const userId = userSelectors.getUserId( state );
    const isTurn = gameSelectors.isPlayerTurn( state, userId );
    const canEndTurn = true;

    return {
        isTurn,
        canEndTurn
    };
};

const mapDispatchToProps = dispatch => ( {
    endTurn: () => dispatch( gameOperations.endTurn() )
} );


const TableContainer = (props) => (
	<Table {...props} />
);

export default connect(
	mapStateToProps,
    mapDispatchToProps

)(TableContainer);