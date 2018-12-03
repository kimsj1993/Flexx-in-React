import * as types from "./types";
import { createApiAction } from '../../utils/redux-api-middleware-utils';

import { userOperations } from '../user';
import { routerOperations } from '../router';

const getSession = ( args ) => ( {
	onSuccess: payload => dispatch => {
		if ( Object.keys( payload.user || {} ).length )
			dispatch( userOperations.login( { id: payload.user.id } ) )
	},
	...( createApiAction(
		{
			endpoint: 'https://fluxx.d.calebj.io/api/session',
			method: 'GET',
			credentials: 'include'
		},
		( rsaa, { types } ) => ( {
			types
		} )
	)( args ) )
} );

const createSession = ( args ) => ( {
	onSuccess: payload => dispatch => {
		dispatch( userOperations.login( { id: payload.user.id } ) ),
		dispatch( routerOperations.checkRoute() );
	},
	... ( createApiAction(
		{
			endpoint: 'https://fluxx.d.calebj.io/api/session',
			method: 'POST',
			credentials: 'include',
			headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			},
			
		},
		( rsaa, { types, username } ) => ( {
			types,
			body: JSON.stringify( {
				username
			} )
	} ) )( args ) )
} );

const updateSession = createApiAction(
	{
		endpoint: 'https://fluxx.d.calebj.io/api/session',
		method: 'PATCH',
		credentials: 'include',
		headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		}
	},
	( rsaa, { types, username } ) => ( {
		types,
		body: JSON.stringify( {
			username
		} )
	} )
);

const deleteSession = ( args ) => ( {
	onSuccess: payload => dispatch => {
		dispatch( userOperations.logout() );
		dispatch( routerOperations.checkRoute() );
	},
	...( createApiAction(
		{
			endpoint: 'https://fluxx.d.calebj.io/api/session',
			method: 'DELETE',
			credentials: 'include'
		},
		( rsaa, { types } ) => ( {
			types
		} )
	)( args ) )
} );

const createGame = createApiAction(
	{
		endpoint: 'https://fluxx.d.calebj.io/api/games',
		method: 'POST',
		credentials: 'include',
		headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		}
	},
	( rsaa, { types, freeJoin = false, password = null, maxPlayers = 6 } ) => ( {
		types,
		body: JSON.stringify( {
			freeJoin,
			password,
			maxPlayers
		} )
	} )
);

const updateGame = createApiAction(
	{
		endpoint: id => `https://fluxx.d.calebj.io/api/games/${id}`,
		method: 'PATCH',
		credentials: 'include',
		headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		}
	},
	( rsaa, { types, id = '@current', freeJoin = undefined, password = undefined, maxPlayers = undefined, hostId = undefined } ) => ( {
		types,
		body: JSON.stringify( {
			freeJoin,
			password,
			maxPlayers,
			hostId
		} ),
		endpoint: rsaa.endpoint( id )
	} )
);

const joinGame = createApiAction(
	{
		endpoint: id => `https://fluxx.d.calebj.io/api/games/${id}`,
		method: 'POST',
		credentials: 'include',
		headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		}
	},
	( rsaa, { types, id, password = undefined } ) => ( {
		types,
		body: JSON.stringify( {
			password
		} ),
		endpoint: rsaa.endpoint( id )
	} )
);

const leaveGame = createApiAction(
	{
		endpoint: id => `https://fluxx.d.calebj.io/api/games/${id}`,
		method: 'POST',
		credentials: 'include'
	},
	( rsaa, { types, id = '@current' } ) => ( {
		types,
		endpoint: rsaa.endpoint( id )
	} )
);

const startGame = createApiAction(
	{
		endpoint: id => `https://fluxx.d.calebj.io/api/games/${id}`,
		method: 'POST',
		credentials: 'include',
		headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		}
	},
	( rsaa, { types, id = '@current', firstPlayer = undefined } ) => ( {
		types,
		body: JSON.stringify( {
			firstPlayer
		} ),
		endpoint: rsaa.endpoint( id )
	} )
);

const deleteGame = createApiAction(
	{
		endpoint: id => `https://fluxx.d.calebj.io/api/games/${id}`,
		method: 'DELETE',
		credentials: 'include'
	},
	( rsaa, { types, id = '@current' } ) => ( {
		types,
		endpoint: rsaa.endpoint( id )
	} )
);

const gameKickPlayer = createApiAction(
	{
		endpoint: id => `https://fluxx.d.calebj.io/api/games/${id}`,
		method: 'POST',
		credentials: 'include',
		headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		}
	},
	( rsaa, { types, id = '@current', playerId } ) => ( {
		types,
		body: JSON.stringify( {
			player_id: playerId
		} ),
		endpoint: rsaa.endpoint( id )
	} )
);

const gameInvokeAction = createApiAction(
	{
		endpoint: id => `https://fluxx.d.calebj.io/api/games/${id}`,
		method: 'POST',
		credentials: 'include',
		headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		}
	},
	( rsaa, { types, id = '@current', cardId } ) => ( {
		types,
		body: JSON.stringify( {
			action_name: cardId
		} ),
		endpoint: rsaa.endpoint( id )
	} )
);

const gameDiscardCard = createApiAction(
	{
		endpoint: id => `https://fluxx.d.calebj.io/api/games/${id}?discard`,
		method: 'POST',
		credentials: 'include',
		headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		}
	},
	( rsaa, { types, id = '@current', cardIds } ) => ( {
		types,
		body: JSON.stringify( {
			card_id: cardIds
		} ),
		endpoint: rsaa.endpoint( id )
	} )
);

const gamePlayCard = createApiAction(
	{
		endpoint: id => `https://fluxx.d.calebj.io/api/games/${id}`,
		method: 'POST',
		credentials: 'include',
		headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		}
	},
	( rsaa, { types, id = '@current', cardId, pick = undefined } ) => ( {
		types,
		body: JSON.stringify( {
			card_id: cardId,
			...( pick ? pick : {} )
		} ),
		endpoint: rsaa.endpoint( id )
	} )
);

const gameEndTurn = createApiAction(
	{
		endpoint: id => `https://fluxx.d.calebj.io/api/games/${id}`,
		method: 'POST',
		credentials: 'include'
	},
	( rsaa, { types, id = '@current', cardId } ) => ( {
		types,
		endpoint: rsaa.endpoint( id )
	} )
);

export {
	getSession,
	createSession,
	updateSession,
	deleteSession,
	createGame,
	updateGame,
	joinGame,
	leaveGame,
	startGame,
	deleteGame,
	gameKickPlayer,
	gameInvokeAction,
	gameDiscardCard,
	gamePlayCard,
	gameEndTurn
};