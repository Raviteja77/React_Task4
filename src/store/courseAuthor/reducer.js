import {
	DELETE_ALL_AUTHORS,
	DELETE_COURSE_AUTHOR,
	SAVE_COURSE_AUTHOR,
} from './actionTypes';

const initialState = {
	authors: [],
	error: '',
};

const courseAuthorReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_COURSE_AUTHOR:
			return {
				...state,
				authors: state.authors.filter((author) => author.id !== action.payload),
			};

		case SAVE_COURSE_AUTHOR:
			return {
				...state,
				authors: state.authors.concat(action.payload),
			};

		case DELETE_ALL_AUTHORS:
			return {
				authors: [],
				error: '',
			};

		default:
			return state;
	}
};

export default courseAuthorReducer;
