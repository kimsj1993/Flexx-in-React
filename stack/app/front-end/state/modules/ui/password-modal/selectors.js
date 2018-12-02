const isVisible = state => state.ui.passwordModal.show;

const getValue = state => state.ui.passwordModal.value;

const isError = state => state.ui.passwordModal.error;

const getErrorText = state => state.ui.passwordModal.errorText;

const getID = state => state.ui.passwordModal.id;

const getProps = state => ( {

	show: isVisible( state ),

	value: getValue( state ),

	error: isError( state ),

	errorText: getErrorText( state ),

	id: getID( state )

} );

export {
	getProps
};