const startGame = ( { id } ) => dispatch => {
	fetch('https://fluxx.d.calebj.io/api/games/' + id + '?start', {
		method: 'POST',
		credentials: 'include'
	});
};

const deleteGame = ( { id } ) => dispatch => {
	fetch('https://fluxx.d.calebj.io/api/games/' + id, {
		method: 'DELETE',
		credentials: 'include'
	});
};

export {
	startGame,
	deleteGame
};