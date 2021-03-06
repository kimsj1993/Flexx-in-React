import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import OpponentContainer from './OpponentContainer';

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%'
	}
});

const mapStateToProps = (state, ownProps) => {
	const opponentIds = Object.keys(state.data.opponents);

	return { opponentIds };
};

const OpponentsContainer = ({ classes, opponentIds }) => (
	<div className={ classes.root } >
		{opponentIds.map(id => (<OpponentContainer opponentId={ id } />))}
	</div>
);

export default withStyles(styles)(connect(
	mapStateToProps
)(OpponentsContainer));