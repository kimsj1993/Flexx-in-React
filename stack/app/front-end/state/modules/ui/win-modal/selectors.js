import { usersSelectors } from '../../data/users';

const getWinnerId = state => state.ui.winModal.winnerId;

const isVisible = state => state.ui.winModal.show;

const getProps = state => ( {
	show: isVisible( state ),
	winner: usersSelectors.getUserById( state, getWinnerId( state ) )
} );

export {
	getProps
};