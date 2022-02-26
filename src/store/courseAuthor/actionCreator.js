import {
	DELETE_ALL_AUTHORS,
	DELETE_COURSE_AUTHOR,
	SAVE_COURSE_AUTHOR,
} from './actionTypes';
export const deleteCourseAuthor = (authorId) => {
	return {
		type: DELETE_COURSE_AUTHOR,
		payload: authorId,
	};
};

export const saveCourseAuthor = (author) => {
	return {
		type: SAVE_COURSE_AUTHOR,
		payload: author,
	};
};

export const deleteAllAuthors = () => {
	return {
		type: DELETE_ALL_AUTHORS,
	};
};
