import {
	ADD_AUTHOR_FAILURE,
	ADD_AUTHOR_SUCCESS,
	FETCH_AUTHORS_FAILURE,
	FETCH_AUTHORS_SUCCESS,
} from './actionTypes';

const initialState = {
	authors: [],
	error: '',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_AUTHORS_SUCCESS:
			return {
				...state,
				authors: action.payload,
				error: '',
			};

		case FETCH_AUTHORS_FAILURE:
			return {
				...state,
				authors: [],
				error: action.payload,
			};

		case ADD_AUTHOR_SUCCESS:
			return {
				...state,
				authors: [...state.authors, action.payload],
				error: '',
			};

		case ADD_AUTHOR_FAILURE:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;
