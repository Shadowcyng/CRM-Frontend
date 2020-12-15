import {
	EVENT_DELETE,
	EVENT_GET,
	EVENT_GET_BY_ID,
	EVENT_FAIL,
	EVENT_SAVE,
	EVENT_REQUEST,
	EVENT_UPDATE,
} from '../ActionTypes/EventActionType';

let initialState = {
	events: [],
	eventById: null,
	error: null,
	loading: false,
	message: '',
};

export const eventReducer = (state = initialState, action) => {
	switch (action.type) {
		case EVENT_REQUEST:
			return {
				...state,
				loading: true,
				error: false,
			};
		case EVENT_SAVE:
			return {
				...state,
				eventById: action.payload,
				loading: false,
				error: null,
			};
		case EVENT_UPDATE:
			return {
				...state,
				eventById: action.payload,
				loading: false,
				error: null,
			};
		case EVENT_GET:
			return {
				events: action.payload,
				loading: false,
				error: null,
			};
		case EVENT_GET_BY_ID:
			return {
				eventById: action.payload,
				loading: false,
				error: null,
			};
		case EVENT_DELETE:
			return {
				...state,
				message: action.payload,
				loading: false,
				error: null,
			};
		case EVENT_FAIL:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};
