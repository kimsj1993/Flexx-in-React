const isVisible = state => state.ui.passwordModal.show;

const getValue = state => state.ui.passwordModal.value;

const getError = state => state.ui.passwordModal.error;

const getID = state => state.ui.passwordModal.id;

const getProps = state => ( {

	show: isVisible( state ),

	value: getValue( state ),

	error: getError( state ),

	id: getID( state )

} );

export {
	getProps
};