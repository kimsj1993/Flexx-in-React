import { Component } from 'react';
import { Provider } from './socket-context';
import io from 'socket.io-client';

export default class SocketProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			socket: null,
			connect: this.connect.bind(this),
			disconnect: this.disconnect.bind(this),
			connected: false
		}
	}

	connect (callback) {
		const { connected } = this.state;

		if (!connected) {
			
			const socket = io('https://fluxx.d.calebj.io');

			this.setState({
				socket,
				connected: true
			}, () => {
				if (callback) callback(socket);
			});
		}
	}

	disconnect (callback) {
		const { socket } = this.state;

		if (socket) {

			if (callback) callback(socket);

			socket.close();

			this.setState({
				socket: null,
				connected: false
			});
		}
	}

	render() {
		return (
			<Provider value={ this.state }>
				{ this.props.children }
			</Provider>
		);
	}
}