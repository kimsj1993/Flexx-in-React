import fetch from 'cross-fetch';
import { Router } from './routes'

// types

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM';

// normal actions


// action creators

export const updateUserData = data => ({
	type: UPDATE_USER_DATA,
	data
});

export const updateLoginForm = value => ({
	type: UPDATE_LOGIN_FORM,
	value
});


// thunk action creators

export const ensureLoggedIn = () => (dispatch, getState) => {
	const { userData } = getState();

	if (!userData) {
		fetch('https://fluxx.d.calebj.io/api/session')
			.then(res => res.json())
			.then(json => {
				if (!Object.keys(json).length) {
					Router.pushRoute('/');
				} else {
					dispatch(updateUserData(json));
				}
			});
	}

	return;
}

export const handleLogin = username => dispatch => {
	fetch('https://fluxx.d.calebj.io/api/session?username=' + username, {
		mode: 'POST'
	})
		.then(res => res.json())
		.then(json => {
			dispatch(updateUserData(json));
			Router.pushRoute('/game');
		});

	return;
}