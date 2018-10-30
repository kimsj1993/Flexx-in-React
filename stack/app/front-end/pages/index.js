import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { Router } from '../routes';

import LoginForm from '../components/LoginForm';

const mapStateToProps = (state, ownProps) => ({
	value: state.ui.loginForm.value
});

class Main extends Component {
	constructor(props) {
		super(props);

		const { userData } = props;

		if (userData) {
			Router.pushRoute('/game');
		}
	}

	handleChange = e => {
		e.preventDefault();

		const { dispatch } = this.props;

		dispatch(actions.updateLoginForm(e.target.value));
	}

	handleLogin = e => {
		e.preventDefault();

		const { dispatch, value } = this.props;

		dispatch(actions.handleLogin(value));
	}

	render () {
		const { value } = this.props;

		return (
			<LoginForm value={ value } handleChange={ this.handleChange } handleLogin={ this.handleLogin } />
		);
	};
}

export default connect(
	mapStateToProps
)(Main);