import { Component } from 'react';

import io from 'socket.io-client';

class Game extends Component {
	componentDidMount() {
		this.socket = io('url');
	}

	componentWillUnmount() {
		this.socket.close();
	}
}

export default Game;