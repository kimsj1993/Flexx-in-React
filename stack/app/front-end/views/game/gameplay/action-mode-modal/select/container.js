import { connect } from 'react-redux';

import { actionModeSelectsUIOperations, actionModeSelectsUISelectors } from '../../../../../state/modules/ui/action-mode-selects';

import Component from './component';

const mapDispatchToProps = dispatch => ( {
	select: ( index, selected, selection, pick ) => () => {

		if ( selected ) dispatch( actionModeSelectsUIOperations.removeSelection( { selection, index, pick } ) );
		else dispatch( actionModeSelectsUIOperations.addSelection( { selection, index, pick } ) );

	}
} );

const Container = ( props ) => (
	<Component { ...props } />
);

export default connect(
	actionModeSelectsUISelectors.getPropsForIndex,
	mapDispatchToProps
)( Container );