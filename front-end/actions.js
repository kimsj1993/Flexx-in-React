import fetch from 'cross-fetch';
import { Router } from './routes'

// types

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

// normal actions


// action creators

export const updateUserData = data => ({
	type: UPDATE_USER_DATA,
	data
});


// thunk action creators

export const ensureLoggedIn = () => (dispatch, getState) => {
	const { userData } = getState();

	if (!userData) {
		fetch('http://fluxx.d.calebj.io/api/session', {
			mode: 'CORS'
		})
			.then(res => res.json())
			.then(json => {
				console.log(json);
				if (json == {}) {
					Router.pushRoute('/');
				} else {
					dispatch(updateUserData(json));
				}
			});
	}

	return;
}