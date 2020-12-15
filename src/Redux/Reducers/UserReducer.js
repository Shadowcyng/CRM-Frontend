import {
	Login,
	SIGNUP,
	FAIL,
	LOGOUT,
	REQUEST,
} from '../ActionTypes/UserActionType';

const initialState = {
	loading: true,
	userInfo: null,
	error: {},
};

export const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST:
			return {
				...state,
				loading: true,
			};
		case SIGNUP:
			return {
				userInfo: action.payload,
				loading: false,
				error: null,
			};
		case Login:
			return {
				userInfo: action.payload,
				loading: false,
				error: null,
			};
		case LOGOUT:
			return {
				userInfo: null,
				loading: false,
				error: null,
			};
		case FAIL:
			return {
				error: action.payload,
				loading: false,
				userInfo: null,
			};
		default:
			return state;
	}
};
