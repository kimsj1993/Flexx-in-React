import { Component } from 'react';
import { Provider } from './login-context';

import fetch from 'cross-fetch';

import { connect } from 'react-redux';
import { updateUserData } from '../actions';

import { Router } from '../routes'

import withSocket from './withSocket';

class LoginProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false,
			login: this.login,
			logout: this.logout
		};
	}

	login = (username) => {
		const { dispatch } = this.props;
		console.log(username);
		fetch('https://fluxx.d.calebj.io/api/session?username=' + username, {
			method: 'POST',
			credentials: 'include'
			})
			.then(res => res.json())
			.then(json => {
				this.setState({
					loggedIn: true
				});
				//dispatch(updateUserData(json));
				Router.pushRoute('/game');
			});
	};

	logout = () => {
		const { socketConnection, dispatch } = this.props;

		fetch('https://fluxx.d.calebj.io/api/session', {
			method: 'DELETE',
			credentials: 'include'
		}).then(() => {
			//dispatch(updateUserData(null));
			socketConnection.disconnect();
			Router.pushRoute('/');
		});
	}

	componentDidMount() {
		const { dispatch } = this.props;

		// TODO: dispatch start of load here

		fetch('https://fluxx.d.calebj.io/api/session', 
			{
				credentials: 'include'
			})
			.then(res => res.json())
			.then(json => {
				if (!Object.keys(json).length) {
					Router.pushRoute('/');
				} else {
					this.setState({
						loggedIn: true
					});
					dispatch(updateUserData(json));
					Router.pushRoute('/game');
				}
			});
	}

	render() {
		const { loggedIn, login, logout } = this.state;

		return (
			<Provider value={{ loggedIn, login, logout }} >
				{ this.props.children }
			</Provider>
		);
	}
}

export default withSocket(connect()(LoginProvider));