import { playersSelectors } from '../../data/players';
import { userSelectors } from '../../user';
import { handSelectors } from '../../data/hand';
import { tableSelectors } from '../../data/table';

const isVisible = state => state.ui.discardCardsModal.show;

const getError = state => state.ui.discardCardsModal.error;

const getLoading = state => state.ui.discardCardsModal.loading;

const getSelectedKeeperIds = state => state.ui.discardCardsModal.selectedKeepers;

const getSelectedHandIds = state => state.ui.discardCardsModal.selectedHand;

const getProps = state => ( {
	show: isVisible( state ),
	error: getError( state ),
	loading: getLoading( state ),
	keepers: playersSelectors.getPlayerKeeperIds( state, userSelectors.getUserId( state ) ),
	hand: handSelectors.getHandIds( state ),
	selectedKeepers: getSelectedKeeperIds( state ),
	selectedHand: getSelectedHandIds( state ),
	keeperLimit: tableSelectors.getKeeperLimit( state ),
	handLimit: tableSelectors.getHandLimit( state )
} );

export {
	getProps
};