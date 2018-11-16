import { cardsOperations, cardsSelectors } from '../state/modules/data/cards';
import { gameOperations, gameSelectors } from '../state/modules/data/game';
import { handOperations, handSelectors } from '../state/modules/data/hand';
import { lobbyOperations, lobbySelectors } from '../state/modules/data/lobby';
import { playersOperations, playersSelectors } from '../state/modules/data/players';
import { roomOperations, roomSelectors } from '../state/modules/data/room';
import { tableOperations, tableSelectors } from '../state/modules/data/table';
import { userOperations, userSelectors } from '../state/modules/data/user';
import { usersOperations, usersSelectors } from '../state/modules/data/users';

export const onSocketConnection = ( { state, dispatch } ) => socket => {
	socket.on('global', data => {
		switch ( data.e ) {

			case 'GAME_CREATE':
				dispatch( lobbyOperations.addRoom( {
					id: data.game.id,
					host: data.game.host_id,
					created: data.game.created,
					started: data.game.started,
					freeJoin: data.game.free_join,
					password: data.game.has_password,
					players: data.game.player_ids.length,
					maxPlayers: data.game.max_players,
					minPlayers: data.game.min_players
				} ) );
				break;

			case 'GAME_REMOVE':
				dispatch( lobbyOperations.removeRoom( {
					id: data.game_id
				} ) );
				break;

			case 'GAME_START':
				dispatch( lobbyOperations.updateRoom( {
					id: data.game_id,
					started: data.game.started
				} ) );
				break;


			case 'GAME_UPDATE':
				const update = { id: data.game.id };
				if (data.game.host_id) update.host = data.game.host_id;
				dispatch( lobbyOperations.updateRoom( {
					id: data.game.id,
					room: update
				} ) );
				break;

			case 'GAME_USER_JOIN':
				dispatch( lobbyOperations.roomUserJoined( {
					userId: data.user_id,
					roomId: data.game_id
				} ) );
				break;

			case 'GAME_USER_LEAVE':
				dispatch( lobbyOperations.roomUserLeft( {
					userId: data.user_id,
					roomId: data.game_id
				} ) );
				break;

			case 'USER_LOGIN':
				dispatch( usersOperations.addUser( {
					id: data.user.id,
					username: data.user.username
				} ) );
				break;

			case 'USER_LOGOUT':
				dispatch( usersOperations.removeUser( {
					id: data.user_id
				} ) );
				break;

			case 'USER_UPDATE':
				dispatch( usersOperations.updateUser( {
					id: data.user.id,
					username: data.user.username
				} ) );

			default: break;
		};
	});

	socket.on('game', data => {
		switch ( data.e ) {
			case 'CARD_DISCARD':
				const discards = tableSelectors.getDiscardIds( state );
				const newDiscards = [ ...discards, card_id ];
				dispatch( tableOperations.updateDiscardPile( {
					discards: newDiscards
				} ) );
			case 'CARD_PLAY':
				break;
			default: break;
		};
	});

	socket.on('user', data => {
		switch ( data.e ) {
			case 'GAME_SYNC':
				console.log(data)
				dispatch( gameOperations.initGame( {
					id: data.game.id
				} ) );

				dispatch( gameOperations.updateGame( {
					turn: data.game.current_player_id
				} ) );

				dispatch( lobbyOperations.updateRoom( {
					id: data.game.id,
					host: data.game.host_id,
					created: data.game.created,
					started: data.game.started
				} ) );

				dispatch( playersOperations.addPlayers( {
					players: data.game.player_states.map( state => ( {
						id: state.player_id,
						cards: state.hand_size,
						tempCards: state.temp_hand_size,
						playsLeft: state.plays_left,
						tempPlaysLeft: state.plays_left_t,
						keeperIds: state.keepers,
						position: state.position
					} ) )
				} ) );

				dispatch( tableOperations.replaceDiscards( {
					ids: data.game.discard_pile
				} ) );

				dispatch( tableOperations.updateDeck( {
					count: data.game.draw_pile_size
				} ) );

				dispatch( tableOperations.addGoals( {
					ids: data.game.goals
				} ) );

				dispatch( tableOperations.updateDrawRule( {
					count: data.game.draw_num
				} ) );

				dispatch( tableOperations.updatePlayRule( {
					count: data.game.play_num
				} ) );

				dispatch( tableOperations.updateHandLimit( {
					limit: data.game.hand_limit
				} ) );

				dispatch( tableOperations.updateKeeperLimit( {
					limit: data.game.keeper_limit
				} ) );

				dispatch( tableOperations.addRules( {
					ids: data.game.rules
				} ) );

				dispatch( handOperations.replaceHand( {
					ids: data.state.hand
				} ) );

				dispatch( handOperations.replaceTempHand( {
					ids: data.state.temp_hand
				} ) );

				break;
			case 'HAND_UPDATE':

				dispatch( handOperations.replaceHand( {
					hand: data.hand
				} ) );

				dispatch( handOperations.replaceTempHand( {
					hand: data.temp_hand
				} ) );
				break;

			case 'HELLO':
				console.log(data)
				const types = {
					KEEPER: 'keeper',
					GOAL: 'goal',
					NEW_RULE: 'rule',
					ACTION: 'action'
				};
				const cards = data.cards.map( card => ( {
					id: card.id,
					name: card.name,
					type: types[ card.type ],
					subtype: card.subtype && card.subtype.toLowerCase()
				} ) );
				dispatch( cardsOperations.addCards( {
					cards
				} ) );

				const users = data.users.map( user => ( {
					id: user.id,
					username: user.username
				} ) );

				dispatch( usersOperations.replaceUsers( {
					users: users
				} ) );

				const rooms = data.games.map( game => ( {
					id: game.id,
					host: game.host_id,
					created: game.created,
					started: game.started,
					freeJoin: game.free_join,
					password: game.has_password,
					players: game.player_ids.length,
					maxPlayers: game.max_players,
					minPlayers: game.min_players
				} ) );

				dispatch( lobbyOperations.replaceRooms( {
					rooms: rooms
				} ) );

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