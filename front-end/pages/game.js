import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import withSocket from '../utils/withSocket';
import withLogin from '../utils/withLogin';

import LogoutButton from '../components/LogoutButton';

const mapStateToProps = (state, ownProps) => ({
	userData: state.userData
});

// const mapDispatchToProps = (dispatch, ownProps) => {
// 	return {};
// };

class Game extends Component {
	componentDidMount() {
		const { socketConnection } = this.props;

		socketConnection.connect();
	}

	handleLogout = e => {
		const { logout } = this.props;

		logout();
	}

	render() {
		return (
			<LogoutButton handleLogout={ this.handleLogout } />
		);
	}
}

export default withLogin(withSocket(connect(
	mapStateToProps
)(Game)));