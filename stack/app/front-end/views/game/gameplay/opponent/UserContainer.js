import { connect } from 'react-redux';

import User from './User';

import { playersSelectors } from '../../../../state/modules/data/players';
import { usersSelectors } from '../../../../state/modules/data/users';
import { gameSelectors } from '../../../../state/modules/data/game';
import * as userSelectors from "../../../../state/modules/user/selectors";

const mapStateToProps = (state, ownProps) => {


    const userId = userSelectors.getUserId( state );
    console.log(userId)

    const user = usersSelectors.getUserById( state, userId );

    const name = user && user.username;

    const isTurn = gameSelectors.isPlayerTurn( state, userId );

    const player = playersSelectors.getPlayerById( state, userId );

    const playsRemaining = player && player.playsLeft;


    const keeperIds = playersSelectors.getPlayerKeeperIds( state, userId );

    return {
        name,
        isTurn,
        playsRemaining,
        keeperIds
    };
};

const UserContainer = (props) => (
    <User {...props} />
);

export default connect(
    mapStateToProps
)(UserContainer);