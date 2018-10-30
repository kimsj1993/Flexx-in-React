import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import io from 'socket.io-client';

const mapStateToProps = (state, ownProps) => ({
	userData: state.userData
});

// const mapDispatchToProps = (dispatch, ownProps) => {
// 	return {};
// };

class Game extends Component {
	componentDidMount() {
		const { dispatch, getState } = this.props;

		dispatch(actions.ensureLoggedIn());

		this.socket = io('https://fluxx.d.calebj.io');

		this.socket.on('connection', () => console.log(connected));
	}

	componentWillUnmount() {
		this.socket.close();
	}

	render() {
		return '';
	}
}

export default connect(
	mapStateToProps
)(Game);