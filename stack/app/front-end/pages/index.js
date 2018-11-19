import { Component } from 'react';
import { connect } from 'react-redux';

import withLogin from '../utils/withLogin';

import { loginSelectors, loginOperations } from '../state/modules/ui/login';

import { Router } from '../routes';

import LoginForm from '../views/LoginForm';
const mapStateToProps = ( state ) => ( {
	value: loginSelectors.getValue( state )
} );

class Main extends Component {

	handleChange = e => {
		e.preventDefault();

		const { dispatch } = this.props;

		dispatch( loginOperations.updateLoginForm( e.target.value ) );
	}

	handleLogin = () => {
		const { login, value } = this.props;

		login( value );
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