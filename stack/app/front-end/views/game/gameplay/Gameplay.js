import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import { connect } from 'react-redux';

import OpponentsContainer from './opponent/OpponentsContainer';
import PlayerTurnCardContainer from './playerTurnCard/AvailableActionContainer';
import CardContainer from './card/CardContainer';
import GameStateCardContainer from './gameStateCard/GameStateCardContainer';
import TableContainer from './table/TableContainer';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';

import DiscardCardsModal from './DiscardCardsModal';

import Header from '../Header';

import GameSummaryCard from './game-summary-card';

import PlayerActions from './player-actions';
import ActionModeSelectsDialog from './action-mode-modal';

import DeckContainer from './table/DeckContainer';
import DiscardContainer from './table/DiscardContainer';

import HandContainer from './table/HandContainer';

import EndTurnButton from './EndTurnButton';

import Notifier from './Notifier';

import BrowseDiscardsModal from './browse-discards-modal';

import { gameSelectors, gameOperations } from '../../../state/modules/data/game';
import * as userSelectors from "../../../state/modules/user/selectors";

const mapStateToProps = state => {
	const userId = userSelectors.getUserId( state );
    const isTurn = gameSelectors.isPlayerTurn( state, userId );

    return {
        isTurn
    };
};

const styles = theme => ({
	root: {
		backgroundColor: '#FAFAFA',
		minHeight: '100vh',
		height: '100vh'
	},
	opponentsRoot: {
		height: 368,
		backgroundColor: '#926496',
		zIndex: 2
	},
	playerArea: {
		padding: '16px',
		backgroundColor: theme.palette.background.default,
		display: 'grid',
		gridTemplateColumns: '416px minmax( 0px, 1fr ) 432px',
		minHeight: 'calc( 100% - 368px )',
		maxWidth: '100vw'
	},
	turn: {
		backgroundColor: '#EFE7EF'
	},
	left: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	deck: {
		display: 'flex'
	},
	center: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end'
	},
	hand: {

	},
	handTurn: {
		
	},
	right: {

	}
});

let Gameplay = ( { classes, isTurn } ) => (
	<section className={ classes.root } >
		<ActionModeSelectsDialog />
		<BrowseDiscardsModal />
		<Paper elevation={ 2 } square classes={ { root: classes.opponentsRoot } }>
			<OpponentsContainer />
		</Paper>
		<Paper elevation={ 2 } classes={ { 
			root: classNames( classes.playerArea, { [ classes.turn ]: isTurn } )
		} } >
			<section className={ classes.left } >
				<PlayerActions />

				<div className={ classes.deck } >
					<DiscardContainer/>
					<DeckContainer/>
				</div>
			</section>
			<section className={ classes.center } >
				<div className={ isTurn ? classes.handTurn : classes.hand } >
					<HandContainer/>
				</div>
			</section>
			<section>
				<GameSummaryCard />
				<EndTurnButton/>
				<Notifier />
			</section>
		</Paper>
		<DiscardCardsModal />
	</section>
);

Gameplay = withStyles(styles)(Gameplay);

export default connect(
	mapStateToProps
)( Gameplay );