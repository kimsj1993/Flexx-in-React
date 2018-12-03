const showDialog = state => state.ui.logoutModal.show;

const getLoading = state => state.ui.logoutModal.loading;

const getError = state => state.ui.logoutModal.error;

const getProps = state => ( {
	show: showDialog( state ),
	loading: getLoading( state ),
	error: getError( state )
} );

export {
	getProps
};