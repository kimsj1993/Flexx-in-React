import * as actions from "./actions";

import { cardsOperations, cardsSelectors } from '../data/cards';
import { chatOperations, chatSelectors } from '../data/chat';
import { gameOperations, gameSelectors } from '../data/game';
import { handOperations, handSelectors } from '../data/hand';
import { lobbyOperations, lobbySelectors } from '../data/lobby';
import { playersOperations, playersSelectors } from '../data/players';
import { roomOperations, roomSelectors } from '../data/room';
import { tableOperations, tableSelectors } from '../data/table';
import { userOperations, userSelectors } from '../user';
import { usersOperations, usersSelectors } from '../data/users';
import { appUIOperations } from '../ui/app';
import { discardCardsModalUIOperations } from '../ui/discard-cards-modal';
import { actionModeSelectsUISelectors, actionModeSelectsUIOperations } from '../ui/action-mode-selects';
import { winModalUIOperations } from '../ui/win-modal';
import { notifierOperations } from '../notifier';

const socketConnect = actions.socketConnect;
const socketDisconnect = actions.socketDisconnect;
const socketEmit = actions.socketEmit;

const globalGameCreate = ( { game } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_CREATE, with data: ', game );

	dispatch( appUIOperations.appLoadRequest() );

	const { id, host_id, created, started, free_join, 
		has_password, min_players, max_players, player_ids } = game;

	dispatch( lobbyOperations.addRoom( { id, host: host_id, created, started, 
		freeJoin: free_join, minPlayers: min_players, maxPlayers: max_players,
		password: has_password, playerIds: player_ids } ) );

	dispatch( appUIOperations.appLoadSuccess() );
};

const globalGameRemove = ( { game_id } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_REMOVE, with data: ', game_id );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( lobbyOperations.removeRoom( { id: game_id } ) );

	const state = getState();

	if ( game_id == gameSelectors.getGameId( state ) ) {

		dispatch( gameOperations.leaveGame() );
		dispatch( handOperations.clearHand() );
		dispatch( handOperations.clearTempHand() );
		dispatch( playersOperations.clearPlayers() );
		dispatch( tableOperations.resetTable() );
		dispatch( chatOperations.clearMessages() );

	}

	dispatch( appUIOperations.appLoadSuccess() );
};

const globalGameStart = ( { game_id, started } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_START, with data: ', game_id, started );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( lobbyOperations.updateRoom( { id: game_id, started } ) );

	dispatch( appUIOperations.appLoadSuccess() );
};

const globalGameReset = ( { game } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_RESET, with data: ', game );

	dispatch( appUIOperations.appLoadRequest() );

	const { id, host_id, created, started, free_join, 
		has_password, min_players, max_players, player_states } = game;

	dispatch( lobbyOperations.updateRoom( { id, host: host_id, created, started, 
		freeJoin: free_join, minPlayers: min_players, maxPlayers: max_players,
		password: has_password, playerIds: player_states.map( state => state.id ) } ) );

	const state = getState();

	if ( game_id == gameSelectors.getGameId( state ) ) {

		dispatch( handOperations.clearHand() );
		dispatch( handOperations.clearTempHand() );
		dispatch( playersOperations.resetPlayers() );
		dispatch( tableOperations.resetTable() );

	}

	dispatch( appUIOperations.appLoadSuccess() );

};

const globalGameUpdate = ( { game } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_UPDATE, with data: ', game );

	dispatch( appUIOperations.appLoadRequest() );

	const updatedRoom = { id: game.id };

	if ( game.host_id ) updatedRoom.host = game.host_id;
	if ( game.created ) updatedRoom.created = game.created;
	if ( game.started ) updatedRoom.started = game.started;
	if ( game.free_join ) updatedRoom.freeJoin = game.free_join;
	if ( game.has_password ) updatedRoom.password = game.has_password;
	if ( game.min_players ) updatedRoom.minPlayers = game.min_players;
	if ( game.max_players ) updatedRoom.maxPlayers = game.max_players;
	if ( game.player_ids ) updatedRoom.playerIds = game.player_ids;

	dispatch( lobbyOperations.updateRoom( updatedRoom ) );

	dispatch( appUIOperations.appLoadSuccess() );

};

const globalGameUserJoin = ( { game_id, user_id } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_USER_JOIN, with data: ', game_id, user_id );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( lobbyOperations.roomAddPlayer( { roomId: game_id, playerId: user_id } ) );

	const state = getState();

	if ( game_id == gameSelectors.getGameId( state ) ) {

		dispatch( playersOperations.addPlayer( { id: user_id } ) );

	}

	dispatch( appUIOperations.appLoadSuccess() );

};

const globalGameUserLeave = ( { game_id, user_id } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_USER_LEAVE, with data: ', game_id, user_id );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( lobbyOperations.roomRemovePlayer( { roomId: game_id, playerId: user_id } ) );

	const state = getState();

	if ( game_id == gameSelectors.getGameId( state ) ) {

		dispatch( playersOperations.removePlayer( { id: user_id } ) );

		if ( user_id == userSelectors.getUserId( state ) ) {

			dispatch( gameOperations.leaveGame() );
			dispatch( handOperations.clearHand() );
			dispatch( handOperations.clearTempHand() );
			dispatch( playersOperations.clearPlayers() );
			dispatch( tableOperations.resetTable() );
			dispatch( chatOperations.clearMessages() );

		}

	}

	dispatch( appUIOperations.appLoadSuccess() );
};

const globalUserLogin = ( { user } ) => ( dispatch, getState ) => {
	console.log('global socket event: USER_LOGIN, with data: ', user );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( usersOperations.addUser( user ) );

	dispatch( appUIOperations.appLoadSuccess() );

};

const globalUserLogout = ( { user_id } ) => ( dispatch, getState ) => {
	console.log('global socket event: USER_LOGOUT, with data: ', user_id );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( usersOperations.removeUser( { id: user_id } ) );

	dispatch( appUIOperations.appLoadSuccess() );
	
};

const globalUserUpdate = ( { user } ) => ( dispatch, getState ) => {
	console.log('global socket event: USER_UPDATE, with data: ', user );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( usersOperations.updateUser( user ) );

	dispatch( appUIOperations.appLoadSuccess() );
	
};

const globalGameVictory = ( { game_id, user_id } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_VICTORY, with data: ', game_id, user_id );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( winModalUIOperations.showDialog( { winnerId: user_id } ) );

	dispatch( appUIOperations.appLoadSuccess() );
};

const gameCardDiscard = ( { card_id, game_id, player_id } ) => ( dispatch, getState ) => {
	console.log('game socket event: CARD_DISCARD, with data: ', card_id, game_id, player_id );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( tableOperations.addDiscard( { id: card_id } ) );

	dispatch( appUIOperations.appLoadSuccess() );

	const state = getState();

	const card = state.data.cards.byId[ card_id ];

	dispatch( notifierOperations.enqueueMessage( {
		message: `The ${ card.type } card "${ card.name }" was discarded.`
	} ) );
};

const gameCardPlay = ( { card_id, from_location, from_player, game_id, player_id, to_location } ) => ( dispatch, getState ) => {
	console.log('game socket event: CARD_PLAY, with data: ', card_id, from_location, from_player, game_id, player_id, to_location );

	const state = getState();

	const card = state.data.cards.byId[ card_id ];

	dispatch( notifierOperations.enqueueMessage( {
		message: `The ${ card.type } card "${ card.name }" was played.`
	} ) );
};

const gameCardsDrawn = ( { game_id, player_id, num_drawn } ) => ( dispatch, getState ) => {
	console.log('game socket event: CARDS_DRAWN, with data: ', game_id, player_id, num_drawn );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( playersOperations.playerAddCards( { id: player_id, count: num_drawn } ) );

	dispatch( appUIOperations.appLoadSuccess() );
};

const gameChatMessage = ( { game_id, player_id, message } ) => ( dispatch, getState ) => {
	console.log('game socket event: CHAT_MESSAGE, with data: ', game_id, player_id, message );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( chatOperations.addMessage( { userId: player_id, message } ) );

	dispatch( appUIOperations.appLoadSuccess() );
}

const gameDeckRecycle = ( { game_id, draw_pile_size } ) => ( dispatch, getState ) => {
	console.log('game socket event: DECK_RECYCLE, with data: ', game_id, draw_pile_size );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( tableOperations.clearDiscards() );
	dispatch( tableOperations.updateDeck( { count: draw_pile_size } ) );

	dispatch( appUIOperations.appLoadSuccess() );
};

const gameDiscardRemove = ( { card_id, game_id } ) => ( dispatch, getState ) => {
	console.log('game socket event: DISCARD_REMOVE, with data: ', card_id, game_id );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( tableOperations.removeDiscard( { id: card_id } ) );

	dispatch( appUIOperations.appLoadSuccess() );
};

const gameGameUpdate = ( { game } ) => ( dispatch, getState ) => {
	console.log('game socket event: GAME_UPDATE, with data: ', game );

	dispatch( appUIOperations.appLoadRequest() );

	const updatedRoom = { id: game.id };

	if ( game.host_id ) updatedRoom.host = game.host_id;
	if ( game.created ) updatedRoom.created = game.created;
	if ( game.started ) updatedRoom.started = game.started;
	if ( game.free_join ) updatedRoom.freeJoin = game.free_join;
	if ( game.has_password ) updatedRoom.password = game.has_password;
	if ( game.min_players ) updatedRoom.minPlayers = game.min_players;
	if ( game.max_players ) updatedRoom.maxPlayers = game.max_players;
	if ( game.player_ids ) updatedRoom.playerIds = game.player_ids;

	const state = getState();

	const updatedGame = { id: game.id };

	if ( game.current_player_id ) updatedGame.turn = game.current_player_id;

	dispatch( gameOperations.updateGame( updatedGame ) );

	if ( game.discard_pile ) dispatch( tableOperations.replaceDiscards( { ids: game.discard_pile } ) );

	if ( game.goals ) dispatch( tableOperations.replaceGoals( { ids: game.goals } ) );

	if ( game.play_num ) dispatch( tableOperations.updatePlayRule( { count: game.play_num } ) );

	if ( game.rules ) dispatch( tableOperations.replaceRules( { ids: game.rules } ) );

	if ( game.draw_num ) dispatch( tableOperations.updateDrawRule( { count: game.draw_num } ) );

	if ( game.keeper_limit ) dispatch( tableOperations.updateKeeperLimit( { limit: game.keeper_limit } ) );

	if ( game.hand_limit ) dispatch( tableOperations.updateHandLimit( { limit: game.hand_limit } ) );

	dispatch( lobbyOperations.updateRoom( updatedRoom ) );

	dispatch( appUIOperations.appLoadSuccess() );

};

const gameGoalUpdate = ( { game_id, goals } ) => ( dispatch, getState ) => {
	console.log('game socket event: GOAL_UPDATE, with data: ', game_id, goals );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( tableOperations.replaceGoals( { ids: Array.isArray( goals ) ? goals : [ goals ] } ) );

	dispatch( appUIOperations.appLoadSuccess() );
};

const gameLimitsOver = ( { game_id, hand_over = [], keepers_over = [] } ) => ( dispatch, getState ) => {
	console.log('game socket event: LIMITS_OVER, with data: ', game_id, hand_over, keepers_over );

	const state = getState();

	const userId = userSelectors.getUserId( state );

	if ( hand_over.includes( userId ) || keepers_over.includes( userId ) ) {

		dispatch( discardCardsModalUIOperations.showDialog() );

	}
};

const gamePlayerUpdate = ( { game_id, player } ) => ( dispatch, getState ) => {
	console.log('game socket event: PLAYER_UPDATE, with data: ', game_id, player );

	dispatch( appUIOperations.appLoadRequest() );

	const updatedPlayer = { id: player.player_id };

	if ( player.keepers ) updatedPlayer.keeperIds = player.keepers;
	if ( player.plays_left ) updatedPlayer.playsLeft = player.plays_left;
	if ( player.plays_left_t ) updatedPlayer.tempPlaysLeft = player.plays_left_t;
	if ( player.position ) updatedPlayer.position = player.position;
	if ( player.hand_size ) updatedPlayer.cards = player.hand_size;
	if ( player.temp_hand_size ) updatedPlayer.tempCards = player.temp_hand_size;

	dispatch( playersOperations.updatePlayer( updatedPlayer ) );

	dispatch( appUIOperations.appLoadSuccess() );
};

const gameRulesUpdate = ( { game_id, rules } ) => ( dispatch, getState ) => {
	console.log('game socket event: RULES_UPDATE, with data: ', game_id, rules );

	dispatch( appUIOperations.appLoadRequest() );

	const rulesArr = ( Array.isArray( rules ) ? rules : [ rules ] ).filter( rule => typeof rule === 'string' );

	dispatch( tableOperations.replaceRules( { ids: rulesArr } ) );

	dispatch( appUIOperations.appLoadSuccess() );
};

const gameTurnBegin = ( { game_id, player_id, plays_remaining } ) => ( dispatch, getState ) => {
	console.log('game socket event: TURN_BEGIN, with data: ', game_id, player_id, plays_remaining );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( gameOperations.updateGame( { turn: player_id } ) );
	dispatch( playersOperations.updatePlayer( { id: player_id, playsLeft: plays_remaining } ) );

	dispatch( appUIOperations.appLoadSuccess() );
};

const userActionStep = ( { game_id, pick, reason } ) => ( dispatch, getState ) => {
	console.log('user socket event: ACTION_STEP, with data: ', game_id, pick, reason );

	dispatch( actionModeSelectsUIOperations.showDialog( { picks: Array.isArray( pick ) ? pick : [ pick ] , id: reason } ) );
};

const userGameSync = ( { game, state } ) => ( dispatch, getState ) => {
	console.log('user socket event: GAME_SYNC, with data: ', game, state );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( playersOperations.clearPlayers() );

	game.player_states.forEach( player => dispatch( playersOperations.addPlayer( {
		id: player.player_id, keeperIds: player.keepers, playsLeft: player.plays_left,
		tempPlaysLeft: player.plays_left_t, position: player.position, cards: player.hand_size,
		tempCards: player.temp_hand_size
	} ) ) );

	dispatch( gameOperations.initGame( { id: game.id } ) );

	dispatch( gameOperations.updateGame( { turn: game.current_player_id } ) );

	dispatch( tableOperations.replaceDiscards( { ids: game.discard_pile } ) );
	dispatch( tableOperations.updateDeck( { count: game.draw_pile_size } ) );
	dispatch( tableOperations.replaceGoals( { ids: game.goals } ) );
	dispatch( tableOperations.updatePlayRule( { count: game.play_num } ) );
	dispatch( tableOperations.replaceRules( { ids: game.rules } ) );
	dispatch( tableOperations.updateDrawRule( { count: game.draw_num } ) );
	dispatch( tableOperations.updateKeeperLimit( { limit: game.keeper_limit } ) );
	dispatch( tableOperations.updateHandLimit( { limit: game.hand_limit } ) );

	dispatch( handOperations.replaceHand( { ids: state.hand } ) );
	dispatch( handOperations.replaceTempHand( { ids: state.temp_hand } ) );

	dispatch( appUIOperations.appLoadSuccess() );
};

const userHandUpdate = ( { game_id, hand, temp_hand } ) => ( dispatch, getState ) => {
	console.log('user socket event: HAND_UPDATE, with data: ', game_id, hand, temp_hand );

	dispatch( appUIOperations.appLoadRequest() );

	dispatch( handOperations.replaceHand( { ids: hand } ) );
	dispatch( handOperations.replaceTempHand( { ids: temp_hand } ) );

	dispatch( appUIOperations.appLoadSuccess() );
};

const userHello = ( { cards, games, users } ) => ( dispatch, getState ) => {
	console.log('user socket event: HELLO, with data: ', cards, games, users );

	dispatch( appUIOperations.appLoadRequest() );

	const typeMapping = {
		NEW_RULE: 'rule',
		ACTION: 'action',
		GOAL: 'goal',
		KEEPER: 'keeper'
	};

	dispatch( usersOperations.replaceUsers( { users } ) );

	dispatch( cardsOperations.addCards( { cards: cards.map( card => ( {
		id: card.id,
		name: card.name,
		type: typeMapping[ card.type ],
		subtype: card.subtype && card.subtype.toLowerCase(),
		precondition: card.precondition,
		description: card.description
	} ) ) } ) );

	dispatch( lobbyOperations.replaceRooms( { rooms: games.map( room => ( {
		id: room.id,
		host: room.host_id,
		created: room.created,
		started: room.started,
		freeJoin: room.free_join,
		password: room.has_password,
		minPlayers: room.min_players,
		maxPlayers: room.max_players,
		playerIds: room.player_ids
	} ) ) } ) );

	dispatch( appUIOperations.appLoadSuccess() );
}

export {
	socketConnect,
	socketDisconnect,
	socketEmit,
	globalGameCreate,
	globalGameRemove,
	globalGameStart,
	globalGameReset,
	globalGameUpdate,
	globalGameUserJoin,
	globalGameUserLeave,
	globalUserLogin,
	globalUserLogout,
	globalUserUpdate,
	globalGameVictory,
	gameCardDiscard,
	gameCardPlay,
	gameCardsDrawn,
	gameChatMessage,
	gameDeckRecycle,
	gameDiscardRemove,
	gameGoalUpdate,
	gameGameUpdate,
	gameLimitsOver,
	gamePlayerUpdate,
	gameRulesUpdate,
	gameTurnBegin,
	userActionStep,
	userGameSync,
	userHandUpdate,
	userHello
};