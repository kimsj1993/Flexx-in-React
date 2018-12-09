import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = (state, ownProps) => ( {
	goals: state.data.table.goals.map( id => ( {
		name: state.data.cards.byId[ id ].name,
		requirements: state.data.cards.byId[ id ].description.slice( 0, 40 )
	} ) )
} );

const Container = (props) => (
	<Component {...props} />
);

export default connect(
	mapStateToProps
)( Container );