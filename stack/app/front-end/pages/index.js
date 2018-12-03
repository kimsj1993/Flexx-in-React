import { Component } from 'react';
import { connect } from 'react-redux';

import { loginSelectors, loginOperations, loginTypes } from '../state/modules/ui/login';

import { Router } from '../routes';

import LoginForm from '../views/LoginForm';

import CircularProgress from '@material-ui/core/CircularProgress';

import { appUISelectors } from '../state/modules/ui/app';

import { apiOperations } from '../state/modules/api';

const mapStateToProps = ( state ) => ( {
	...appUISelectors.getProps( state ),
	...loginSelectors.getProps( state )
} );

class Main extends Component {

	handleChange = e => {
		e.preventDefault();

		const { dispatch } = this.props;

		dispatch( loginOperations.updateLoginForm( e.target.value ) );
	}

	handleLogin = e => {
		e.preventDefault();

		const { dispatch } = this.props;

		dispatch( apiOperations.createSession( {
			types: [
				loginTypes.LOGIN_REQUEST,
				loginTypes.LOGIN_SUCCESS,
				loginTypes.LOGIN_ERROR
			],
			username: this.props.value
		} ) );
	}

	render () {
		const { value, loading, error } = this.props;

		return (
			loading ? <CircularProgress /> : <LoginForm { ...this.props } handleChange={ this.handleChange } handleLogin={ this.handleLogin } />
		);
	};
}

export default connect(
	mapStateToProps
)( Main );