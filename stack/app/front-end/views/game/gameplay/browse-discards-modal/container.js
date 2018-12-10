import { connect } from 'react-redux';

import { browseDiscardsModalUISelectors, browseDiscardsModalUIOperations,s } from '../../../../state/modules/ui/browse-discards-modal';

const mapDispatchToProps = dispatch => ( {
	handleClose: () => dispatch( browseDiscardsModalUIOperations.hideDialog() ),
	showDetails: ( { id, selected } ) => () => selected ? 
		dispatch( browseDiscardsModalUIOperations.hideDetails() ) :
		dispatch( browseDiscardsModalUIOperations.showDetails( { id } ) )
} );

import Component from './component';

const Container = ( props ) => (
	<Component { ...props } />
);

export default connect(
	browseDiscardsModalUISelectors.getProps,
	mapDispatchToProps
)( Container );