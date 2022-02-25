import {
	POST_USER_SUCCESS,
	POST_USER_FAILURE,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAILURE,
	GET_USER_SUCCESS,
	GET_USER_FAILURE,
} from './actionTypes';

export const PostUserSuccess = (userData) => {
	return {
		type: POST_USER_SUCCESS,
		payload: userData,
	};
};

export const PostUserFailure = (error) => {
	return {
		type: POST_USER_FAILURE,
		payload: error,
	};
};

export const deleteUserSuccess = () => {
	return {
		type: DELETE_USER_SUCCESS,
	};
};

export const deleteUserFailure = (error) => {
	return {
		type: DELETE_USER_FAILURE,
		payload: error,
	};
};

export const getUserSuccess = (user) => {
	return {
		type: GET_USER_SUCCESS,
		payload: user,
	};
};

export const getUserFailure = (error) => {
	return {
		type: GET_USER_FAILURE,
		payload: error,
	};
};
