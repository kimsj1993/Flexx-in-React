import { connect } from 'react-redux';

import { actionModeSelectsUIOperations, actionModeSelectsUISelectors } from '../../../../state/modules/ui/action-mode-selects';

import Component from './component';

const mapDispatchToProps = dispatch => ( {
	
} );

const Container = ( props ) => (
	<Component { ...props } />
);

export default connect(
	actionModeSelectsUISelectors.getProps,
	mapDispatchToProps
)( Container );