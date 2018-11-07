import * as Actions from '../actions';

export const onSocketConnection = socket => {
	socket.on('user', data => console.log(data));
	socket.on('game', data => console.log(data));
};

export const onSocketDisconnect = socket => {

};