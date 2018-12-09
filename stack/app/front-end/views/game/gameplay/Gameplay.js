import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import OpponentsContainer from './opponent/OpponentsContainer';
import PlayerTurnCardContainer from './playerTurnCard/AvailableActionContainer';
import CardContainer from './card/CardContainer';
import GameStateCardContainer from './gameStateCard/GameStateCardContainer';
import TableContainer from './table/TableContainer';
import Paper from '@material-ui/core/Paper';

import DiscardCardsModal from './DiscardCardsModal';

import Header from '../Header';

import GameSummaryCard from './game-summary-card';
import PlayerActions from './player-actions';


const styles = theme => ({
	root: {
		height: 'calc(100vh - 48px)',
		backgroundColor: '#FAFAFA'
	},
	opponentsRoot: {
		height: 400 - 48,
		backgroundColor: '#926496',
		zIndex: 2,
		marginBottom: 16
	},
	playerArea: {
		padding: '0 16px'
	},
	spacer: {
		flexGrow: 1
	},
	gameInfo: {
		display: 'flex',
		alignItems: 'start'
	}
});

const Gameplay = ({ classes }) => (
	<section className={ classes.root } >
		<Paper square classes={{ root: classes.opponentsRoot }}>
			<OpponentsContainer />
		</Paper>
		<section className={ classes.playerArea } >
			<section className={ classes.gameInfo } >
				<PlayerActions />
				<div className={ classes.spacer } />
				<GameSummaryCard />
			</section>
			<section>
				<TableContainer />
			</section>
		</section>
		<DiscardCardsModal />
	</section>
);

export default withStyles(styles)(Gameplay);