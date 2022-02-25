import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getRole, getUserDetails } from '../../helpers/selectors';

function PrivateRouter({ children }) {
	const role = useSelector(getRole);
	const state = useSelector(getUserDetails);
	// Decides to return children component or return
	// corresponding based on the authorized user and role
	return state && state.successful ? (
		role.toLowerCase() === 'admin' ? (
			children
		) : (
			<Navigate to='/courses' />
		)
	) : (
		<Navigate to='/login' />
	);
}

export default PrivateRouter;
