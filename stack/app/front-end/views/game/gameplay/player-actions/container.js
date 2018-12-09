import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = ( state, ownProps ) => ( {
	actions: state.data.table.rules
		.map( id => state.data.cards.byId[ id ] )
		.filter( card => card.subtype && card.subtype == 'action_rule' )
		.map( card => ( { name: card.name, id: card.id } ) )
} );

const mapDispatchToProps = dispatch => ( {
	
} );

const Container = ( props ) => (
	<Component { ...props } />
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Container );