import { Navigate, Outlet } from 'react-router-dom';
import useLocalStorageToken from '../../customHooks/useLocalStorageToken';

const ProtectRoute = () => {
	// Decides which page should show based on the presence of token
	const token = useLocalStorageToken();
	return token ? <Outlet /> : <Navigate replace to='/login' />;
};

export default ProtectRoute;
