import { cardsOperations, cardsSelectors } from '../state/modules/data/cards';
import { gameOperations, gameSelectors } from '../state/modules/data/game';
import { handOperations, handSelectors } from '../state/modules/data/hand';
import { lobbyOperations, lobbySelectors } from '../state/modules/data/lobby';
import { playersOperations, playersSelectors } from '../state/modules/data/players';
import { roomOperations, roomSelectors } from '../state/modules/data/room';
import { tableOperations, tableSelectors } from '../state/modules/data/table';
import { turnOperations, turnSelectors } from '../state/modules/data/turn';
import { userOperations, userSelectors } from '../state/modules/data/user';
import { usersOperations, usersSelectors } from '../state/modules/data/users';

export const onSocketConnection = ( { state, dispatch } ) => socket => {
	socket.on('global', data => {
		switch ( data.e ) {
			case 'GAME_CREATE':
				dispatch( lobbyOperations.addRoom( {
					id: data.game.id,
					started: Boolean( data.game.started ),
					playerCount: data.game.player_ids.length,
					maxPlayers: data.game.max_players
				} ) );
				break;
			case 'GAME_REMOVE':
				dispatch( lobbyOperations.removeRoom( {
					id: data.game_id
				} ) );
				break;
			case 'GAME_START':
				dispatch( lobbyOperations.roomStarted( {
					id: data.game_id
				} ) );
				break;
			case 'GAME_UPDATE':
				dispatch( lobbyOperations.updateRoom( {
					id: data.game.id,
					room: {
						id: data.game.id,
						started: Boolean( data.game.started ),
						playerCount: data.game.player_ids.length,
						maxPlayers: data.game.max_players
					}
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
					id: data.game.id,
					host: data.game.host_id,
					started: Boolean( data.game.started )
				} ) );

				dispatch( turnOperations.setPlayerTurn( {
					id: data.game.current_player_id
				} ) );

				const turnPlayer = data.game.player_states.reduce( 
					player => player.id == data.game.current_player_id
				);

				// dispatch( turnOperations.updatePlaysRemaining( {
				// 	count: turnPlayer.plays_left || 0
				// } ) );
				// dispatch( turnOperations.updatePlaysRemainingTemp( {
				// 	count: turnPlayer.temp_left_t || 0
				// } ) );

				dispatch( tableOperations.updateDiscardPile( {
					discards: data.game.discard_pile
				} ) );
				dispatch( tableOperations.updateDeckCount( {
					count: data.game.draw_pile_size
				} ) );
				dispatch( tableOperations.addGoals( {
					goals: data.game.goals
				} ) );
				dispatch( tableOperations.updateDrawRule( {
					draw: data.game.draw_num
				} ) );
				dispatch( tableOperations.updatePlayRule( {
					play: data.game.play_num
				} ) );
				dispatch( tableOperations.updateHandLimit( {
					limit: data.game.hand_limit
				} ) );
				dispatch( tableOperations.updateKeeperLimit( {
					limit: data.game.keeper_limit
				} ) );
				dispatch( tableOperations.addRules( {
					rules: data.game.rules
				} ) );

				const players = data.game.player_states.map( player => ( {
					id: player.player_id,
					cardCount: 0,
					keepers: player.keepers,
					position: player.position
				} ) );

				dispatch( playersOperations.addPlayers( {
					players
				} ) );

				dispatch( handOperations.updateHand( {
					hand: data.state.hand
				} ) );
				dispatch( handOperations.updateTempHand( {
					hand: data.state.temp_hand
				} ) );

				break;
			case 'HAND_UPDATE':
				dispatch( handOperations.updateHand( {
					hand: data.hand
				} ) );
				dispatch( handOperations.updateTempHand( {
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
				dispatch( usersOperations.updateUsers( {
					users
				} ) );

				const rooms = data.games.map( game => ( {
					id: game.id,
					started: Boolean( game.started ),
					playerCount: game.player_ids.length,
					maxPlayers: game.max_players
				} ) );
				dispatch( lobbyOperations.updateRooms( {
					rooms
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