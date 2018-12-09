import { connect } from 'react-redux';

import { actionModeSelectsUIOperations, actionModeSelectsUISelectors } from '../../../../../state/modules/ui/action-mode-selects';

import Component from './component';

const mapDispatchToProps = dispatch => ( {
	select: ( index, selected, selection ) => () => {

		if ( selected ) dispatch( actionModeSelectsUIOperations.removeSelection( { selection, index } ) );
		else dispatch( actionModeSelectsUIOperations.addSelection( { selection, index } ) );

	}
} );

const Container = ( props ) => (
	<Component { ...props } />
);

export default connect(
	actionModeSelectsUISelectors.getPropsForIndex,
	mapDispatchToProps
)( Container );