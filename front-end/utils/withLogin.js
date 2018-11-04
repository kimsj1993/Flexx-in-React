import { Consumer } from './login-context';

const withLogin = Component => props => (
	<Consumer>
		{state => <Component {...props} loggedIn={ state.loggedIn } login={ state.login } logout={ state.logout } />}
	</Consumer>
);

export default withLogin;