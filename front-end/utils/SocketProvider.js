import { Component } from 'react';
import { Provider } from './socket-context';
import io from 'socket.io-client';

export default class SocketProvider extends Component {
	state = {
		socket: null
	};

	componentDidMount() {
		const socket = io('https://fluxx.d.calebj.io');

		console.log(socket);

		this.setState({ socket });

		socket.on('connection', () => {
			this.setState({ socket });
		});
	}

	componentWillUnmount() {
		if (this.state.socket) {
			this.state.socket.close();
		}
	}

	render() {
		return (
			<Provider value={ this.state.socket }>
				{ this.props.children }
			</Provider>
		);
	}
}