import axios from 'axios';
import { addAuthorSuccess, addAuthorFailure } from './actionCreator';

// Add new author to the backend.
//
// Dispatching a function to update the store (Redux)
// based on the response from backend
export const saveAuthorInAllAuthors = (authorName, authorizationToken) => {
	return (dispatch) => {
		axios
			.post(
				'http://localhost:3000/authors/add',
				{ name: authorName },
				{
					headers: { Authorization: authorizationToken },
				}
			)
			.then((response) => {
				alert(`${response.data.result.name} added successfully`);
				dispatch(addAuthorSuccess(response.data.result));
			})
			.catch((error) => {
				dispatch(addAuthorFailure(error));
			});
	};
};
