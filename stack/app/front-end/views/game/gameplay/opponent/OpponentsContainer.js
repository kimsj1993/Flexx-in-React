import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { playersSelectors } from '../../../../state/modules/data/players';
import { userSelectors } from '../../../../state/modules/user';

import OpponentContainer from './OpponentContainer';

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%'
	}
});

const mapStateToProps = (state, ownProps) => {
	const userId = userSelectors.getUserId( state );
	const opponentIds = playersSelectors.getPlayerIds( state ).filter( id => id != userId );

	return { opponentIds };
};

const OpponentsContainer = ({ classes, opponentIds }) => (
	<div className={ classes.root } >
		{opponentIds.map((id, index) => (<OpponentContainer opponentId={ id } key={ index } />))}
	</div>
);

export default withStyles(styles)(connect(
	mapStateToProps
)(OpponentsContainer));