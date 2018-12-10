import { connect } from 'react-redux';

import { actionModeSelectsUITypes, actionModeSelectsUIOperations, actionModeSelectsUISelectors } from '../../../../state/modules/ui/action-mode-selects';
import { apiOperations } from '../../../../state/modules/api';

import Component from './component';

const mapDispatchToProps = dispatch => ( {
	handleClose: () => dispatch( actionModeSelectsUIOperations.hideDialog() ),

	confirmSelection: ( { cardId, pick } ) => () => dispatch( apiOperations.gameContinueAction( {
		cardId,
		pick,
		types: [
			actionModeSelectsUITypes.CONTINUE_REQUEST,
			actionModeSelectsUITypes.HIDE_DIALOG,
			actionModeSelectsUITypes.CONTINUE_ERROR
		]
	} ) )
} );

const Container = ( props ) => (
	<Component { ...props } />
);

export default connect(
	actionModeSelectsUISelectors.getProps,
	mapDispatchToProps
)( Container );