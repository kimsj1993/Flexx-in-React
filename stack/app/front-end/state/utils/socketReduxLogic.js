import { socketOperations } from '../modules/socket';

export const onSocketConnect = dispatch => socket => {
	socket.on('global', data => {
		switch ( data.e ) {

			case 'GAME_CREATE':
				dispatch( socketOperations.globalGameCreate( { game: data.game } ) );
				break;

			case 'GAME_REMOVE':
				dispatch( socketOperations.globalGameRemove( { game_id: data.game_id } ) );
				break;

			case 'GAME_START':
				dispatch( socketOperations.globalGameStart( { game_id: data.game_id, started: data.started } ) );
				break;

			case 'GAME_RESET':
				dispatch( socketOperations.globalGameReset( { game: data.game } ) );

			case 'GAME_UPDATE':
				dispatch( socketOperations.globalGameUpdate( { game: data.game } ) );
				break;

			case 'GAME_USER_JOIN':
				dispatch( socketOperations.globalGameUserJoin( { game_id: data.game_id, user_id: data.user_id } ) );
				break;

			case 'GAME_USER_LEAVE':
				dispatch( socketOperations.globalGameUserLeave( { game_id: data.game_id, user_id: data.user_id } ) );
				break;

			case 'USER_LOGIN':
				dispatch( socketOperations.globalUserLogin( { user: data.user } ) );
				break;

			case 'USER_LOGOUT':
				dispatch( socketOperations.globalUserLogout( { user_id: data.user_id } ) );
				break;

			case 'USER_UPDATE':
				dispatch( socketOperations.globalUserUpdate( { user: data.user } ) );
			default: break;
		};
	});

	socket.on('game', data => {
		switch ( data.e ) {
			case 'CARD_DISCARD':
				dispatch( socketOperations.gameCardDiscard( { card_id: data.card_id, gane_id: data.game_id, player_id: data.player_id } ) );
			case 'CARD_PLAY':
				dispatch( socketOperations.gameCardPlay( { 
					card_id: data.card_id, from_location: data.from, from_player: data.from_player, 
					game_id: data.game_id, player_id: data.game_id, to_location: data.to
				} ) );
				break;
			case 'CARDS_DRAWN':
				dispatch( socketOperations.gameCardsDrawn( { game_id: data.game_id, player_id: data.player_id, num_drawn: data.num_drawn } ) );
				break;
			case 'CHAT_MESSAGE':
				dispatch( socketOperations.gameChatMessage( { game_id: data.game_id, player_id: data.player_id, message: data.message } ) );
				break;
			case 'DECK_RECYCLE':
				dispatch( socketOperations.gameDeckRecycle( { game_id: data.game_id, draw_pile_size: data.draw_pile_size } ) );
				break;
			case 'DISCARD_REMOVE':
				dispatch( socketOperations.gameDiscardRemove( { card_id: data.card_id, game_id: data.game_id } ) );
				break;
			case 'GOAL_UPDATE':
				dispatch( socketOperations.gameGoalUpdate( { game_id: data.game_id, goals: data.goals } ) );
				break;
			case 'LIMITS_OVER':
				dispatch( socketOperations.gameLimitsOver( { game_id: data.game_id, hand_over: data.hand_over, keepers_over: data.keepers_over } ) );
				break;
			case 'PLAYER_UPDATE':
				dispatch( socketOperations.gamePlayerUpdate( { game_id: data.game_id, player: data.player } ) );
				break;
			case 'RULES_UPDATE':
				dispatch( socketOperations.gameRulesUpdate( { game_id: data.game_id, rules: data.rules } ) );
				break;
			case 'TURN_BEGIN':
				dispatch( socketOperations.gameTurnBegin( { game_id: data.game_id, player_id: data.player_id, plays_remaining: data.plays_left } ) );
				break;
			default: break;
		};
	});

	socket.on('user', data => {
		switch ( data.e ) {
			case 'GAME_SYNC':
				dispatch( socketOperations.userGameSync( { game: data.game, state: data.state } ) );
				break;
			case 'HAND_UPDATE':
				dispatch( socketOperations.userHandUpdate( { game_id: data.game_id, hand: data.hand, temp_hand: data.temp_hand } ) );
				break;
			case 'HELLO':
				dispatch( socketOperations.userHello( { cards: data.cards, games: data.games, users: data.users } ) );
				break;
			default: break;
		}
	})
};

export const onSocketDisconnect = socket => {
	socket.off('global');
	socket.off('game');
	socket.off('user');
};