import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useCurrentLocation() {
	const location = useLocation();
	const [currentPath, setCurrentPath] = useState('');

	useEffect(() => {
		setCurrentPath(location.pathname);
	}, [location]);
	return currentPath;
}

export default useCurrentLocation;
