const getValue = state => state.ui.login.value;
const getLoading = state => state.ui.login.loading;
const getError = state => state.ui.login.error;

const getProps = state => ( {
	value: getValue( state ),
	loading: getLoading( state ),
	error: getError( state )
} );

export {
	getValue,
	getProps
};