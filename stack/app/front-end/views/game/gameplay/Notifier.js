import { Component } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import { notifierOperations } from '../../../state/modules/notifier';

const mapStateToProps = state => ( {
	notifications: state.notifier.notifications
} );

const mapDispatchToProps = dispatch => ( {
	dequeueSnackbar: key => dispatch( notifierOperations.dequeueMessage( { key } ) )
} );

class Notifier extends Component {

	state = {
		displayed: []
	};

	storeDisplayed = key => {
		this.setState( ( { displayed } ) => ( {
			displayed: [ ...displayed, key ]
		} ) );
	};

	render() {

		const { notifications, enqueueSnackbar, dequeueSnackbar } = this.props;

		const { displayed } = this.state;

		notifications.forEach( notification => {

			setTimeout( () => {

				if ( displayed.indexOf( notification.key ) > -1 ) return;

				enqueueSnackbar( notification.message, notification.options );

				this.storeDisplayed( notification.key );

				dequeueSnackbar( notification.key );

			}, 1 );

		} );

		return null;

	}

};

Notifier = withSnackbar( Notifier );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Notifier );