const startGame = () => dispatch => {
	fetch('https://fluxx.d.calebj.io/api/games/@current?start', {
		method: 'POST',
		credentials: 'include'
	});
};

const deleteGame = () => dispatch => {
	fetch('https://fluxx.d.calebj.io/api/games/@current', {
		method: 'DELETE',
		credentials: 'include'
	});
};

const leaveGame = () => dispatch => {
	fetch('https://fluxx.d.calebj.io/api/games/@current?leave', {
		method: 'POST',
		credentials: 'include'
	});
};

export {
	startGame,
	deleteGame,
	leaveGame
};