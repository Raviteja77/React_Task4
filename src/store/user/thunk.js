import axios from 'axios';
import {
	PostUserSuccess,
	PostUserFailure,
	deleteUserSuccess,
	deleteUserFailure,
	getUserSuccess,
	getUserFailure,
} from './actionCreator';

// Login details send to backend.
//
// Dispatching a function to update the store (Redux)
// based on the response from backend
export const PostUsers = (postLoginDetails) => {
	return (dispatch) => {
		axios
			.post('http://localhost:3000/login', {
				email: postLoginDetails.email,
				password: postLoginDetails.password,
			})
			.then((response) => {
				dispatch(PostUserSuccess(response.data));
			})
			.catch((error) => {
				dispatch(PostUserFailure(error.message));
				alert('Please check the details again');
			});
	};
};

// Logout the authorized user.
//
// Dispatching a function to update the store (Redux)
// based on the response from backend
export const DeleteUser = (dispatch, authorizationToken) => {
	return () => {
		return Promise.resolve(
			axios
				.delete('http://localhost:3000/logout', {
					headers: { Authorization: authorizationToken },
				})
				.then(() => {
					dispatch(deleteUserSuccess());
				})
				.catch((error) => {
					alert(error.message);
					dispatch(deleteUserFailure(error));
				})
		);
	};
};

// Getting the current user role.
//
// Dispatching a function to update the store (Redux)
// based on the response from backend
export const getCurrentUser = (authorizationToken) => {
	return (dispatch) => {
		axios
			.get('http://localhost:3000/users/me', {
				headers: { Authorization: authorizationToken },
			})
			.then((response) => {
				dispatch(getUserSuccess(response.data.result.role));
			})
			.catch((error) => {
				dispatch(getUserFailure(error));
			});
	};
};
