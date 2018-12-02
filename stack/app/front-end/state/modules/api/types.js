const GET_SESSION = 'app/modules/api/GET_SESSION';
const CREATE_SESSION = 'app/modules/api/CREATE_SESSION';
const UPDATE_SESSION = 'app/modules/api/UPDATE_SESSION';
const DELETE_SESSION = 'app/modules/api/DELETE_SESSION';

const GET_GAMES = 'app/modules/api/GET_GAMES';
const CREATE_GAME = 'app/modules/api/CREATE_GAME';

const GET_GAME = 'app/modules/api/GET_GAME';
const UPDATE_GAME = 'app/modules/api/UPDATE_GAME';
const JOIN_GAME = 'app/modules/api/JOIN_GAME';
const LEAVE_GAME = 'app/modules/api/LEAVE_GAME';
const START_GAME = 'app/modules/api/START_GAME';
const DELETE_GAME = 'app/modules/api/DELETE_GAME';

const GAME_KICK_PLAYER = 'app/modules/api/GAME_KICK_PLAYER';

const GAME_INVOKE_ACTION = 'app/modules/api/GAME_INVOKE_ACTION';
const GAME_DISCARD_CARD = 'app/modules/api/GAME_DISCARD_CARD';
const GAME_PLAY_CARD = 'app/modules/api/GAME_PLAY_CARD';

const GAME_END_TURN = 'app/modules/api/GAME_END_TURN';

export {
	GET_SESSION,
	CREATE_SESSION,
	UPDATE_SESSION,
	DELETE_SESSION,
	GET_GAMES,
	CREATE_GAME,
	GET_GAME,
	UPDATE_GAME,
	JOIN_GAME,
	LEAVE_GAME,
	START_GAME,
	DELETE_GAME,
	GAME_KICK_PLAYER,
	GAME_INVOKE_ACTION,
	GAME_DISCARD_CARD,
	GAME_PLAY_CARD,
	GAME_END_TURN
};