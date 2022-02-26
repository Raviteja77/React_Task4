import {
	ADD_COURSE_FAILURE,
	ADD_COURSE_SUCCESS,
	DELETE_COURSE_FAILURE,
	DELETE_COURSE_SUCCESS,
	FETCH_COURSES_FAILURE,
	FETCH_COURSES_SUCCESS,
	UPDATE_COURSE_FAILURE,
	UPDATE_COURSE_SUCCESS,
} from './actionTypes';

const initialState = {
	courses: [],
	error: '',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_COURSES_SUCCESS:
			return {
				...state,
				courses: action.payload,
				error: '',
			};

		case FETCH_COURSES_FAILURE:
			return {
				...state,
				courses: [],
				error: action.payload,
			};

		case ADD_COURSE_SUCCESS:
			return {
				...state,
				courses: [...state.courses, action.payload],
				error: '',
			};

		case ADD_COURSE_FAILURE:
			return {
				...state,
				error: action.payload,
			};

		case DELETE_COURSE_SUCCESS:
			return {
				...state,
				courses: state.courses.filter((course) => course.id !== action.payload),
				error: '',
			};

		case DELETE_COURSE_FAILURE:
			return {
				...state,
				error: action.payload,
			};

		case UPDATE_COURSE_SUCCESS:
			const index = state.courses.findIndex(
				(course) => course.id === action.payload.id
			);
			state.courses[index] = action.payload;
			return {
				...state,
				error: '',
			};

		case UPDATE_COURSE_FAILURE:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;
