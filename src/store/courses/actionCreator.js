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

export const fetchCoursesSuccess = (courses) => {
	return {
		type: FETCH_COURSES_SUCCESS,
		payload: courses,
	};
};

export const fetchCoursesFailure = (error) => {
	return {
		type: FETCH_COURSES_FAILURE,
		payload: error,
	};
};

export const addCourseSuccess = (course) => {
	return {
		type: ADD_COURSE_SUCCESS,
		payload: course,
	};
};

export const addCourseFailure = (error) => {
	return {
		type: ADD_COURSE_FAILURE,
		payload: error,
	};
};

export const deleteCourseSuccess = (courseId) => {
	return {
		type: DELETE_COURSE_SUCCESS,
		payload: courseId,
	};
};

export const deleteCourseFailure = (error) => {
	return {
		type: DELETE_COURSE_FAILURE,
		payload: error,
	};
};

export const updateCourseSuccess = (course) => {
	return {
		type: UPDATE_COURSE_SUCCESS,
		payload: course,
	};
};

export const updateCourseFailure = (error) => {
	return {
		type: UPDATE_COURSE_FAILURE,
		payload: error,
	};
};
