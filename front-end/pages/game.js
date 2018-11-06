import { Component } from 'react';
import { connect } from 'react-redux';

import withSocket from '../utils/withSocket';
import withLogin from '../utils/withLogin';

import LogoutButton from '../components/LogoutButton';

import Gameplay from '../components/game/gameplay/Gameplay';

import { onSocketConnection, onSocketDisconnect } from '../utils/connectSocketAndRedux';

// const mapDispatchToProps = (dispatch, ownProps) => {
// 	return {};
// };

class Game extends Component {
	componentDidMount() {
		const { socketConnection, dispatch, getState } = this.props;

		socketConnection.connect(onSocketConnection);

		const { socket } = socketConnection;

		//socket.on('user', data => console.log(data));
	}

	componentWillUnmount() {
		const { socketConnection } = this.props;
		const { disconnect } = socketConnection;

		//socket.off('user');
		disconnect(socket => {
			socket.off('user');
			socket.off('game');
		});
	}

	handleLogout = e => {
		const { logout } = this.props;

		logout();
	}

	render() {
		return (
			<div>
				<Gameplay />
				<LogoutButton handleLogout={ this.handleLogout } />
			</div>
		);
	}
}

export default connect()(withLogin(withSocket(Game)));