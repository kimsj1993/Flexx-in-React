import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import withLogin from '../utils/withLogin';

import { Router } from '../routes';

import LoginForm from '../components/LoginForm';
const mapStateToProps = (state, ownProps) => ({
	value: state.ui.loginForm.value
});

class Main extends Component {

	handleChange = e => {
		e.preventDefault();

		const { dispatch } = this.props;

		dispatch(actions.updateLoginForm(e.target.value));
	}

	handleLogin = () => {
		const { login, value } = this.props;

		login(value);
	}

	render () {
		const { value } = this.props;

		return (
			<LoginForm value={ value } handleChange={ this.handleChange } handleLogin={ this.handleLogin } />
		);
	};
}

export default withLogin(connect(
	mapStateToProps
)(Main));