import { connect } from 'react-redux';

import { gameInfoTabSelectors, gameInfoTabOperations } from '../../../../state/modules/ui/game-info-tab';

import Component from './component';

const mapStateToProps = ( state, ownProps ) => ( {
	draw: state.data.table.draw,
	play: state.data.table.play,
	handLimit: state.data.table.handLimit,
	keeperLimit: state.data.table.keeperLimit,
	tab: gameInfoTabSelectors.getTabIndex( state )
} );

const mapDispatchToProps = dispatch => ( {
	changeTab: ( e, value ) => dispatch( gameInfoTabOperations.updateTab( { index: value } ) )
} );

const Container = ( props ) => (
	<Component { ...props } />
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Container );