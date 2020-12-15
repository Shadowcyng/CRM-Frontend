import axios from 'axios';
import {
	EVENT_SAVE,
	EVENT_UPDATE,
	EVENT_GET,
	EVENT_GET_BY_ID,
	EVENT_DELETE,
	EVENT_REQUEST,
	EVENT_FAIL,
} from '../ActionTypes/EventActionType';

export const saveEvent = (eventData) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();
	const token = userInfo.token;
	dispatch({ type: EVENT_REQUEST });
	try {
		const { data } = await axios.post('/event', eventData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch({ type: EVENT_SAVE, payload: data });
	} catch (e) {
		dispatch({ type: EVENT_FAIL, payload: e.response.data });
	}
};
export const updateEvent = (eventData, eventId) => async (
	dispatch,
	getState
) => {
	dispatch({ type: EVENT_REQUEST });
	const {
		user: { userInfo },
	} = getState();
	const token = userInfo.token;
	try {
		const { data } = await axios.put(`/event/${eventId}`, eventData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch({ type: EVENT_UPDATE, payload: data });
	} catch (e) {
		dispatch({ type: EVENT_FAIL, payload: e.response.data });
	}
};
export const getEvent = () => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();
	const token = userInfo.token;
	dispatch({ type: EVENT_REQUEST });
	try {
		const { data } = await axios.get('/event', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch({ type: EVENT_GET, payload: data });
	} catch (e) {
		dispatch({ type: EVENT_FAIL, payload: e.response.data });
	}
};
export const getEventById = (eventId) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();
	const token = userInfo.token;
	dispatch({ type: EVENT_REQUEST });
	try {
		const { data } = await axios.get(`/event/${eventId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatchEvent({ type: EVENT_GET_BY_ID, payload: data });
	} catch (e) {
		dispatch({ type: EVENT_FAIL, payload: e.response.data });
	}
};
export const deleteEvent = (eventId) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();
	const token = userInfo.token;
	dispatch({ type: EVENT_REQUEST });
	try {
		const { data } = await axios.delete(`/event/${eventId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch({ type: EVENT_DELETE, payload: data });
	} catch (e) {
		dispatch({ type: EVENT_FAIL, payload: e.response.data });
	}
};
