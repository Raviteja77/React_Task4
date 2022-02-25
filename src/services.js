import axios from 'axios';
import {
	fetchCoursesSuccess,
	fetchCoursesFailure,
} from './store/courses/actionCreator';

import { fetchAuthorsSuccess } from './store/authors/actionCreator';
import {
	deleteAllAuthors,
	deleteCourseAuthor,
	saveCourseAuthor,
} from './store/courseAuthor/actionCreator';

// Add new course author to the store
export const saveAuthorInCourseAuthor = (author) => {
	return (dispatch) => {
		dispatch(saveCourseAuthor(author));
	};
};

// Remove course author from the store
export const removeAuthorInCourseAuthors = (author) => {
	return (dispatch) => {
		dispatch(deleteCourseAuthor(author));
	};
};

// Remove all the course authors from the store
export const removeAllAuthorsInCourseAuthors = () => {
	return (dispatch) => {
		dispatch(deleteAllAuthors());
	};
};

// Fetching the courses and authors at a stretch from backend.
export const fetchCoursesAndAuthors = () => {
	const authors = axios.get('http://localhost:3000/authors/all');
	const courses = axios.get('http://localhost:3000/courses/all');
	return (dispatch) => {
		Promise.all([courses, authors])
			.then((response) => {
				dispatch(fetchCoursesSuccess(response[0].data.result));
				dispatch(fetchAuthorsSuccess(response[1].data.result));
			})
			.catch((error) => {
				dispatch(fetchCoursesFailure(error));
			});
	};
};
