import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import SocketProvider from '../utils/SocketProvider';

import withSocket from '../utils/withSocket';

const mapStateToProps = (state, ownProps) => ({
	userData: state.userData
});

// const mapDispatchToProps = (dispatch, ownProps) => {
// 	return {};
// };

class Game extends Component {

	render() {
		return (
			''
		);
	}
}

export default withSocket(connect(
	mapStateToProps
)(Game));