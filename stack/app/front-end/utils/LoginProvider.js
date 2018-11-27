import { Component } from 'react';
import { Provider } from './login-context';

import fetch from 'cross-fetch';

import { connect } from 'react-redux';

import { userOperations } from '../state/modules/data/user';
import { usersOperations } from '../state/modules/data/users';
import { gameOperations } from '../state/modules/data/game';

import { Router } from '../routes';

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
		console.log('Logging in with username', username);
		fetch('https://fluxx.d.calebj.io/api/session?username=' + username, {
			method: 'POST',
			credentials: 'include'
			})
			.then(res => res.json())
			.then(json => {
				this.setState({
					loggedIn: true
				});
				dispatch( userOperations.initUser( { id: json.user.id } ) );
				dispatch( usersOperations.addUser( json.user ) );
				Router.pushRoute('/game');
			});
	};

	logout = () => {
		const { dispatch } = this.props;

		fetch('https://fluxx.d.calebj.io/api/session', {
			method: 'DELETE',
			credentials: 'include'
		}).then(() => {
			dispatch( userOperations.clearUser() );
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
					dispatch( userOperations.initUser( { id: json.user.id } ) );
					dispatch( usersOperations.addUser( json.user ) );
					console.log('Logging in with username', json.user.username);
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

export default connect()(LoginProvider);