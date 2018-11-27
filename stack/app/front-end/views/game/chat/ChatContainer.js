import { connect } from 'react-redux';

import { chatOperations, chatSelectors } from '../../../state/modules/data/chat';
import { chatUIOperations, chatUISelectors } from '../../../state/modules/ui/chat';
import { usersSelectors } from '../../../state/modules/data/users';

import Chat from './Chat';

const mapStateToProps = (state, ownProps) => {
	const { id } = ownProps;

	const messages = chatSelectors.getMessages( state )
		.map( obj => ( { username: usersSelectors.getUserById( state, obj.userId ).username, message: obj.message } ) );

	const value = chatUISelectors.getValue( state );

	return {
		messages,
		value
	};
};

const mapDispatchToProps = dispatch => ( {
	sendMessage: message => e => {
		e.preventDefault();
		dispatch( chatOperations.sendMessage( { message } ) );
		dispatch( chatUIOperations.clearChatMessageField() );
	},
	handleChange: e => dispatch( chatUIOperations.updateChatMessageField( { value: e.target.value } ) )
} );

const ChatContainer = (props) => (
	<Chat {...props} />
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatContainer);