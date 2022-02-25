import { useSelector } from 'react-redux';
import { getAuthors } from '../helpers/selectors';

function useAuthorsIdToGetName(authorsId) {
	const authorsList = useSelector(getAuthors);
	const arrayOfAuthors = [];
	authorsId.forEach((authorId) =>
		authorsList.forEach((author) => {
			if (author.id === authorId) {
				arrayOfAuthors.push(author.name);
			}
		})
	);
	return arrayOfAuthors;
}

export default useAuthorsIdToGetName;
