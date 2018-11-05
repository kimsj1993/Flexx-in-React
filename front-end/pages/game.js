import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import withSocket from '../utils/withSocket';
import withLogin from '../utils/withLogin';

import LogoutButton from '../components/LogoutButton';

import Header from '../components/game/Header';
import Gameplay from '../components/game/gameplay/Gameplay';

const mapStateToProps = (state, ownProps) => ({
	userData: state.data.user
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
			<div>
				<Header />
				<Gameplay />
				<LogoutButton handleLogout={ this.handleLogout } />
			</div>
		);
	}
}

export default withLogin(withSocket(connect(
	mapStateToProps
)(Game)));