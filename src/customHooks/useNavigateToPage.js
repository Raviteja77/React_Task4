import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function useNavigateToPage(pathName) {
	const navigate = useNavigate();

	return useCallback(
		() => navigate(`${pathName}`, { replace: true }),
		[navigate, pathName]
	);
}
export default useNavigateToPage;
