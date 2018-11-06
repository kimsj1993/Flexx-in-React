import { Component } from 'react';

import withSocket from '../utils/withSocket';
import withLogin from '../utils/withLogin';

import LogoutButton from '../components/LogoutButton';

import Gameplay from '../components/game/gameplay/Gameplay';

// const mapDispatchToProps = (dispatch, ownProps) => {
// 	return {};
// };

class Game extends Component {
	componentDidMount() {
		const { socketConnection } = this.props;

		socketConnection.connect(socket => {
			socket.on('user', data => console.log(data));
			socket.on('game', data => console.log(data));
		});

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

export default withLogin(withSocket(Game));