import {
	DELETE_USER_FAILURE,
	DELETE_USER_SUCCESS,
	GET_USER_FAILURE,
	GET_USER_SUCCESS,
	POST_USER_FAILURE,
	POST_USER_SUCCESS,
} from './actionTypes';

const initialState = {
	userDetails: {},
	error: '',
	role: '',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case POST_USER_SUCCESS:
			return {
				...state,
				userDetails: action.payload,
				error: '',
			};

		case POST_USER_FAILURE:
			return {
				...state,
				userDetails: {},
				error: action.payload,
			};

		case DELETE_USER_SUCCESS:
			localStorage.clear();
			return {
				userDetails: {},
				error: '',
			};

		case DELETE_USER_FAILURE:
			return {
				...state,
				userDetails: {},
				error: action.payload,
			};

		case GET_USER_SUCCESS:
			return {
				...state,
				role: action.payload,
				error: '',
			};

		case GET_USER_FAILURE:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;
