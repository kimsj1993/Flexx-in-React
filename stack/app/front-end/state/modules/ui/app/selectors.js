const getLoading = state => state.ui.app.loading;
const getError = state => state.ui.app.error;

const getProps = state => ( {
	loading: getLoading( state ),
	error: getError( state )
} );

export {
	getProps
};