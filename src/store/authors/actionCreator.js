import {
	ADD_AUTHOR_FAILURE,
	ADD_AUTHOR_SUCCESS,
	FETCH_AUTHORS_FAILURE,
	FETCH_AUTHORS_SUCCESS,
} from './actionTypes';

export const fetchAuthorsSuccess = (authors) => {
	return {
		type: FETCH_AUTHORS_SUCCESS,
		payload: authors,
	};
};

export const fetchAuthorsFailure = (error) => {
	return {
		type: FETCH_AUTHORS_FAILURE,
		payload: error,
	};
};

export const addAuthorSuccess = (author) => {
	return {
		type: ADD_AUTHOR_SUCCESS,
		payload: author,
	};
};

export const addAuthorFailure = (error) => {
	return {
		type: ADD_AUTHOR_FAILURE,
		payload: error,
	};
};
