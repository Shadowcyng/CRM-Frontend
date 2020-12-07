import { Login, SIGNUP, FAIL, LOGOUT } from '../ActionTypes/UserActionType';
import axios from 'axios';
import Cookie from 'js-cookie';

export const signup = (name, email, password, confirmPassword) => async (
	dispatch
) => {
	console.log(
		'name, email, password, confirmPassword',
		name,
		email,
		password,
		confirmPassword
	);
	try {
		const { data } = await axios.post('/user/signup', {
			name,
			email,
			password,
			confirmPassword,
		});
		dispatch({ type: SIGNUP, payload: data });
		Cookie.set('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({ type: FAIL, payload: error.response.data });
	}
};

export const login = (email, password) => async (dispatch) => {
	try {
		const { data } = await axios.post('/user/login', { email, password });
		dispatch({ type: Login, payload: data });
		Cookie.set('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({ type: FAIL, payload: error.response.data });
	}
};
export const logout = (email, password) => async (dispatch, getState) => {
	try {
		dispatch({ type: LOGOUT });
		Cookie.remove('userInfo');
	} catch (error) {
		console.log('error', error);
	}
};
