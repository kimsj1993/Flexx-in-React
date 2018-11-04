import { Consumer } from './socket-context';

const withSocket = Component => props => (
	<Consumer>
		{state => <Component {...props} socket={ state } />}
	</Consumer>
);

export default withSocket;