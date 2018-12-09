import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { discardCardsModalUISelectors, discardCardsModalUIOperations, discardCardsModalUITypes } from '../../../state/modules/ui/discard-cards-modal';
import { lobbyOperations } from '../../../state/modules/data/lobby';
import { apiOperations } from '../../../state/modules/api';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import CardSelect from './CardSelect';

const Transition = props => <Slide direction='down' { ...props } />;

const mapDispatchToProps = dispatch => ( {
	handleClose: () => dispatch( discardCardsModalUIOperations.hideDialog() ),

	selectHand: ( selected, id ) => () => {

		if ( selected ) dispatch( discardCardsModalUIOperations.deselectHand( { cardId: id } ) );
		else dispatch( discardCardsModalUIOperations.selectHand( { cardId: id } ) );

	},

	selectKeeper: ( selected, id ) => () => {

		if ( selected ) dispatch( discardCardsModalUIOperations.deselectKeeper( { cardId: id } ) );
		else dispatch( discardCardsModalUIOperations.selectKeeper( { cardId: id } ) );

	},

	discardCards: ( { cards } ) => () => dispatch( apiOperations.gameDiscardCard( {
		cardIds: cards,
		types: [
			discardCardsModalUITypes.DISCARD_CARDS_REQUEST,
			discardCardsModalUITypes.HIDE_DIALOG,
			discardCardsModalUITypes.DISCARD_CARDS_ERROR
		]
	} ))
} );

const styles = theme => ( {
	cardSelectWell: {
		display: 'flex',
		marginBottom: 8,
		marginTop: 8,
		overflowX: 'scroll',
		backgroundColor: theme.palette.grey[ 300 ],
		borderRadius: 8
	}
} );

let DiscardCardsModal = ( { classes, show, loading, handleClose, keepers, hand, keeperLimit, 
	handLimit, selectedKeepers, selectedHand, selectHand, selectKeeper, discardCards, error
} ) => {

	const overKeeperLimit = keeperLimit !== null && keepers.length > keeperLimit;
	const overHandLimit = handLimit !== null && hand.length > handLimit;

	const keeperLimitMet = !overKeeperLimit || selectedKeepers.length == keepers.length - keeperLimit;
	const handLimitMet = !overHandLimit || selectedHand.length == hand.length - handLimit;
	const limitsMet = keeperLimitMet && handLimitMet;

	return (
		<Dialog open={ show } onClose={ handleClose } TransitionComponent={ Transition } disableBackdropClick disableEscapeKeyDown >

			<DialogTitle>Discard Cards</DialogTitle>

			<DialogContent>

				{ error ? 

					<DialogContentText color='error' gutterBottom >
					
						Something went wrong. Please try again.

					</DialogContentText>

					:

					''

				}

				<DialogContentText gutterBottom >
					
					Your keepers, hand, or both are over the limits required by the current rules. You must
					discard cards until you are under each limit before you can continue.

				</DialogContentText>

				{ overKeeperLimit ?

					<section>

						<Typography variant='subtitle1'> Select Keepers </Typography>

						<Paper classes={ { root: classes.cardSelectWell } } elevation={ 0 } >

							{ keepers.map( id => 
								<div onClick={ selectKeeper( selectedKeepers.includes( id ), id ) } >
								<CardSelect 
									cardId={ id } 
									selected={ selectedKeepers.includes( id ) } 
								/></div> ) }

						</Paper>

						<Typography color={ keeperLimitMet ? 'default' : 'error' } variant="subtitle2"> Select { keepers.length - keeperLimit - selectedKeepers.length } cards </Typography>

					</section>

					:

					''

				}

				{ overHandLimit ?

					<section>

						<Typography variant='subtitle1'> Select Hand Cards </Typography>

						<Paper classes={ { root: classes.cardSelectWell } } elevation={ 0 } >

							{ hand.map( id => 
								<div onClick={ selectHand( selectedHand.includes( id ), id ) } >
								<CardSelect 
									cardId={ id } 
									selected={ selectedHand.includes( id ) } 
								/></div> ) }

						</Paper>

						<Typography color={ handLimitMet ? 'default' : 'error' } variant="subtitle2"> Select { hand.length - handLimit - selectedHand.length } cards </Typography>

					</section>

					:

					''

				}

			</DialogContent>

			<DialogActions>
				
				{

					limitsMet

					?

					<Button color='primary' onClick={ discardCards( { cards: [ ...selectedHand, ...selectedKeepers ] } ) } >
						Discard Cards
					</Button>

					:

					<Tooltip title='You must select the correct amount of cards to continue.' placement='top' >
						<span>
							<Button color='primary' disabled >
								Discard Cards
							</Button>
						</span>
					</Tooltip>

				}

			</DialogActions>

		</Dialog>
	)

};

DiscardCardsModal = withStyles( styles )( DiscardCardsModal );

export default connect(
	discardCardsModalUISelectors.getProps,
	mapDispatchToProps
)( DiscardCardsModal );