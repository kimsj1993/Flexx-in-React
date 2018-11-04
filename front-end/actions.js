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

