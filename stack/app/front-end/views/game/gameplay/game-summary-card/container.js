import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = ( state, ownProps ) => ( {
	draw: state.data.table.draw,
	play: state.data.table.play,
	handLimit: state.data.table.handLimit,
	keeperLimit: state.data.table.keeperLimit
} );

const Container = ( props ) => (
	<Component { ...props } />
);

export default connect(
	mapStateToProps
)( Container );