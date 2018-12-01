const isVisible = state => state.ui.createGameModal.show;

const getMaxPlayersSelectValue = state => state.ui.createGameModal.maxPlayersSelectValue;

const getFreeJoinSwitchValue = state => state.ui.createGameModal.freeJoinSwitchValue;

const getPasswordSwitchValue = state => state.ui.createGameModal.passwordSwitchValue;

const getPasswordTextFieldValue = state => state.ui.createGameModal.passwordTextFieldValue;

const getProps = state => ( {
	show: isVisible( state ),
	maxPlayersSelectValue: getMaxPlayersSelectValue( state ),
	freeJoinSwitchValue: getFreeJoinSwitchValue( state ),
	passwordSwitchValue: getPasswordSwitchValue( state ),
	passwordTextFieldValue: getPasswordTextFieldValue( state )
} );

export {
	getProps
};