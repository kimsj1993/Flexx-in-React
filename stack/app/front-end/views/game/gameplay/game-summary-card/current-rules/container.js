import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = (state, ownProps) => ( {
	rules: state.data.table.rules.map( id => ( {
		name: state.data.cards.byId[ id ].name
	} ) )
} );

const Container = (props) => (
	<Component {...props} />
);

export default connect(
	mapStateToProps
)( Container );