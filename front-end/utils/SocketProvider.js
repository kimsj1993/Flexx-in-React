import { Component } from 'react';
import { Provider } from './socket-context';
import io from 'socket.io-client';

export default class SocketProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			socket: null,
			connect: this.connect,
			disconnect: this.disconnect,
			connected: false
		}
	}

	connect = () => {
		if (!this.state.connected) {
			this.setState({
				socket: io('https://fluxx.d.calebj.io'),
				connected: true
			});
		}
		console.log('connected');
	}

	disconnect = () => {
		if (this.state.socket) {
			this.state.socket.close();
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