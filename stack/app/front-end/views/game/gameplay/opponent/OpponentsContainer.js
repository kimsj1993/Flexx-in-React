import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { playersSelectors } from '../../../../state/modules/data/players';
import { userSelectors } from '../../../../state/modules/user';

import OpponentContainer from './OpponentContainer';
import UserContainer from './UserContainer';
const styles = theme => ({
	root: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
		width: '100%'
	}
});

const mapStateToProps = (state, ownProps) => {
	const userId = userSelectors.getUserId( state );
	const opponentIds = playersSelectors.getPlayerIds( state ).filter( id => id != userId );

	return { opponentIds, userId };
};

const OpponentsContainer = ({ classes, opponentIds, userId }) => (
	<div className={ classes.root } >
		<UserContainer userId = {userId}  key = {userId}/>
		{opponentIds.map((id, index) => (<OpponentContainer opponentId={ id } key={ index } />))}
	</div>
);

export default withStyles(styles)(connect(
	mapStateToProps
)(OpponentsContainer));