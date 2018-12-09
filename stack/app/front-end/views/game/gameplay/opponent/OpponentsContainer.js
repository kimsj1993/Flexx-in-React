import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { playersSelectors } from '../../../../state/modules/data/players';
import { userSelectors } from '../../../../state/modules/user';

import OpponentContainer from './OpponentContainer';
import UserContainer from './UserContainer';
const styles = theme => ({
	root: {
		display: 'flex',
		width: '100%',
		height: 368
	},
	opponents: {
		display: 'flex',
		overflowX: 'scroll'
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
		<div className={ classes.opponents } >
			{opponentIds.map((id, index) => (<OpponentContainer opponentId={ id } key={ index } />))}
		</div>
	</div>
);

export default withStyles(styles)(connect(
	mapStateToProps
)(OpponentsContainer));