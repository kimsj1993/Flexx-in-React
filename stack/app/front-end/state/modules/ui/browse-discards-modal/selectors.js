const isVisible = state => state.ui.browseDiscardsModal.show;

const getCardId = state => state.ui.browseDiscardsModal.id;

const getProps = state => ( {
	discards: state.data.table.discards,
	show: isVisible( state ),
	selectedId: getCardId( state )
} );

export {
	getProps
};