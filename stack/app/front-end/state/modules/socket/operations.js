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

const socketConnect = actions.socketConnect;
const socketDisconnect = actions.socketDisconnect;
const socketEmit = actions.socketEmit;

const globalGameCreate = ( { game } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_CREATE, with data: ', game );

	const { id, host_id, created, started, free_join, 
		has_password, min_players, max_players, player_ids } = game;

	dispatch( lobbyOperations.addRoom( { id, host: host_id, created, started, 
		freeJoin: free_join, minPlayers: min_players, maxPlayers: max_players,
		password: has_password, playerIds: player_ids } ) );
};

const globalGameRemove = ( { game_id } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_REMOVE, with data: ', game_id );

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
};

const globalGameStart = ( { game_id, started } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_START, with data: ', game_id, started );

	dispatch( lobbyOperations.updateRoom( { id: game_id, started } ) );

	const state = getState();
};

const globalGameReset = ( { game } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_RESET, with data: ', game );

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

};

const globalGameUpdate = ( { game } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_UPDATE, with data: ', game );

	const updatedRoom = { id: game_id };

	if ( game.host_id ) updatedRoom.host = game.host_id;
	if ( game.created ) updatedRoom.created = game.created;
	if ( game.started ) updatedRoom.started = game.started;
	if ( game.free_join ) updatedRoom.freeJoin = game.free_join;
	if ( game.has_password ) updatedRoom.password = game.has_password;
	if ( game.min_players ) updatedRoom.minPlayers = game.min_players;
	if ( game.max_players ) updatedRoom.maxPlayers = game.max_players;
	if ( game.player_ids ) updatedRoom.playerIds = game.player_ids;

	const state = getState();

	if ( game_id == gameSelectors.getGameId( state ) ) {

		const updatedGame = { id: game_id };

		if ( game.current_player_id ) updatedGame.turn = game.current_player_id;

		dispatch( gameOperations.updateGame( updatedGame ) );

		if ( game.discard_pile ) dispatch( tableOperations.replaceDiscards( { ids: game.discard_pile } ) );

		if ( game.goals ) dispatch( tableOperations.replaceGoals( { ids: game.goals } ) );

		if ( game.play_num ) dispatch( tableOperations.updatePlayRule( { count: game.play_num } ) );

		if ( game.rules ) dispatch( tableOperations.replaceRules( { ids: game.rules } ) );

		if ( game.draw_num ) dispatch( tableOperations.updateDrawRule( { count: game.draw_num } ) );

		if ( game.keeper_limit ) dispatch( tableOperations.updateKeeperLimit( { limit: game.keeper_limit } ) );

		if ( hame.hand_limit ) dispatch( tableOperations.updateHandLimit( { limit: game.hand_limit } ) );

	}

	dispatch( lobbyOperations.updateRoom( updatedRoom ) );

};

const globalGameUserJoin = ( { game_id, user_id } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_USER_JOIN, with data: ', game_id, user_id );

	dispatch( lobbyOperations.roomAddPlayer( { roomId: game_id, playerId: user_id } ) );

	const state = getState();

	if ( game_id == gameSelectors.getGameId( state ) ) {

		dispatch( playersOperations.addPlayer( { id: user_id } ) );

	}

};

const globalGameUserLeave = ( { game_id, user_id } ) => ( dispatch, getState ) => {
	console.log('global socket event: GAME_USER_LEAVE, with data: ', game_id, user_id );

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
};

const globalUserLogin = ( { user } ) => ( dispatch, getState ) => {
	console.log('global socket event: USER_LOGIN, with data: ', user );

	dispatch( usersOperations.addUser( user ) );

};

const globalUserLogout = ( { user_id } ) => ( dispatch, getState ) => {
	console.log('global socket event: USER_LOGOUT, with data: ', user_id );

	dispatch( usersOperations.removeUser( { id: user_id } ) );
	
};

const globalUserUpdate = ( { user } ) => ( dispatch, getState ) => {
	console.log('global socket event: USER_UPDATE, with data: ', user );

	dispatch( usersOperations.updateUser( user ) );
	
};

const gameCardDiscard = ( { card_id, game_id, player_id } ) => ( dispatch, getState ) => {
	console.log('game socket event: CARD_DISCARD, with data: ', card_id, game_id, player_id );

	dispatch( tableOperations.addDiscard( { id: card_id } ) );
};

const gameCardPlay = ( { card_id, from_location, from_player, game_id, player_id, to_location } ) => ( dispatch, getState ) => {
	console.log('game socket event: CARD_PLAY, with data: ', card_id, from_location, from_player, game_id, player_id, to_location );
};

const gameCardsDrawn = ( { game_id, player_id, num_drawn } ) => ( dispatch, getState ) => {
	console.log('game socket event: CARDS_DRAWN, with data: ', game_id, player_id, num_drawn );

	dispatch( playersOperations.playerAddCards( { id: player_id, count: num_drawn } ) );
};

const gameChatMessage = ( { game_id, player_id, message } ) => ( dispatch, getState ) => {
	console.log('game socket event: CHAT_MESSAGE, with data: ', game_id, player_id, message );

	dispatch( chatOperations.addMessage( { userId: player_id, message } ) );
}

const gameDeckRecycle = ( { game_id, draw_pile_size } ) => ( dispatch, getState ) => {
	console.log('game socket event: DECK_RECYCLE, with data: ', game_id, draw_pile_size );

	dispatch( tableOperations.clearDiscards() );
	dispatch( tableOperations.updateDeck( { count: draw_pile_size } ) );
};

const gameDiscardRemove = ( { card_id, game_id } ) => ( dispatch, getState ) => {
	console.log('game socket event: DISCARD_REMOVE, with data: ', card_id, game_id );

	dispatch( tableOperations.removeDiscard( { id: card_id } ) );
};

const gameGoalUpdate = ( { game_id, goals } ) => ( dispatch, getState ) => {
	console.log('game socket event: GOAL_UPDATE, with data: ', game_id, goals );

	dispatch( tableOperations.replaceGoals( { ids: goals } ) );
};

const gameLimitsOver = ( { game_id, hand_over, keepers_over } ) => ( dispatch, getState ) => {
	console.log('game socket event: LIMITS_OVER, with data: ', game_id, hand_over, keepers_over );
};

const gamePlayerUpdate = ( { game_id, player } ) => ( dispatch, getState ) => {
	console.log('game socket event: PLAYER_UPDATE, with data: ', game_id, player );

	const updatedPlayer = { id: player.player_id };

	if ( player.keepers ) updatedPlayer.keeperIds = player.keepers;
	if ( player.plays_left ) updatedPlayer.playsLeft = player.plays_left;
	if ( player.plays_left_t ) updatedPlayer.tempPlaysLeft = player.plays_left_t;
	if ( player.position ) updatedPlayer.position = player.position;
	if ( player.hand_size ) updatedPlayer.cards = player.hand_size;
	if ( player.temp_hand_size ) updatedPlayer.tempCards = player.temp_hand_size;

	dispatch( playersOperations.updatePlayer( updatedPlayer ) );
};

const gameRulesUpdate = ( { game_id, rules } ) => ( dispatch, getState ) => {
	console.log('game socket event: RULES_UPDATE, with data: ', game_id, rules );

	dispatch( tableOperations.replaceRules( { ids: rules } ) );
};

const gameTurnBegin = ( { game_id, player_id, plays_remaining } ) => ( dispatch, getState ) => {
	console.log('game socket event: TURN_BEGIN, with data: ', game_id, player_id, plays_remaining );

	dispatch( gameOperations.updateGame( { turn: player_id } ) );
	dispatch( playersOperations.updatePlayer( { id: player_id, playsLeft: plays_remaining } ) );
};

const userGameSync = ( { game, state } ) => ( dispatch, getState ) => {
	console.log('user socket event: GAME_SYNC, with data: ', game, state );

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

	dispatch( playersOperations.clearPlayers() );

	game.player_states.forEach( player => dispatch( playersOperations.addPlayer( {
		id: player.player_id, keeperIds: player.keepers, playsLeft: player.plays_left,
		tempPlaysLeft: player.plays_left_t, position: player.position, cards: player.hand_size,
		tempCards: player.temp_hand_size
	} ) ) );

	dispatch( handOperations.replaceHand( { ids: state.hand } ) );
	dispatch( handOperations.replaceTempHand( { ids: state.temp_hand } ) );
};

const userHandUpdate = ( { game_id, hand, temp_hand } ) => ( dispatch, getState ) => {
	console.log('user socket event: HAND_UPDATE, with data: ', game_id, hand, temp_hand );

	dispatch( handOperations.replaceHand( { ids: hand } ) );
	dispatch( handOperations.replaceTempHand( { ids: temp_hand } ) );
};

const userHello = ( { cards, games, users } ) => ( dispatch, getState ) => {
	console.log('user socket event: HELLO, with data: ', cards, games, users );

	const typeMapping = {
		NEW_RULE: 'rule',
		ACTION: 'action',
		GOAL: 'goal',
		KEEPER: 'keeper'
	};

	dispatch( cardsOperations.addCards( { cards: cards.map( card => ( {
		id: card.id,
		name: card.name,
		type: typeMapping[ card.type ],
		subtype: card.subtype && card.subtype.toLowerCase()
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

	dispatch( usersOperations.replaceUsers( { users } ) );
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
	gameCardDiscard,
	gameCardPlay,
	gameCardsDrawn,
	gameChatMessage,
	gameDeckRecycle,
	gameDiscardRemove,
	gameGoalUpdate,
	gameLimitsOver,
	gamePlayerUpdate,
	gameRulesUpdate,
	gameTurnBegin,
	userGameSync,
	userHandUpdate,
	userHello
};