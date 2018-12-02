import { Component } from 'react';
import { connect } from 'react-redux';

import { loginSelectors, loginOperations } from '../state/modules/ui/login';

import { Router } from '../routes';

import LoginForm from '../views/LoginForm';

import CircularProgress from '@material-ui/core/CircularProgress';

import { appUISelectors } from '../state/modules/ui/app';

const mapStateToProps = ( state ) => ( {
	value: loginSelectors.getValue( state ),
	...appUISelectors.getProps( state )
} );

class Main extends Component {

	handleChange = e => {
		e.preventDefault();

		const { dispatch } = this.props;

		dispatch( loginOperations.updateLoginForm( e.target.value ) );
	}

	render () {
		const { value, loading } = this.props;

		return (
			loading ? <CircularProgress /> : <LoginForm value={ value } handleChange={ this.handleChange } handleLogin={ this.handleLogin } />
		);
	};
}

export default connect(
	mapStateToProps
)( Main );