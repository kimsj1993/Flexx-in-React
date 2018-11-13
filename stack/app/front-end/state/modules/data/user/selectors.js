const loggedIn = ( state ) => state.data.user.loggedIn;

const getUserId = ( state ) => state.data.user.id;

export {
	loggedIn,
	getUserId,
	getUsername
};