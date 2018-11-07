import { Consumer } from './socket-context';

const withSocket = Component => props => (
	<Consumer>
		{state => <Component {...props} socketConnection={ state } />}
	</Consumer>
);

export default withSocket;