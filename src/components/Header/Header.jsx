import React from 'react';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { constantVariables } from '../../constants';
import './Header.css';
import useCurrentLocation from '../../customHooks/useCurrentLocation';
import useNavigateToPage from '../../customHooks/useNavigateToPage';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteUser } from '../../store/user/thunk';
import { getUserDetails } from '../../helpers/selectors';

function Header() {
	const currentPath = useCurrentLocation();

	const navigateToLogin = useNavigateToPage('/login');

	const state = useSelector(getUserDetails);

	const userName = state.user ? state.user.name : '';

	const dispatch = useDispatch();

	const clickHandler = () => {
		dispatch(DeleteUser(dispatch, state.result)).then(() => {
			navigateToLogin();
		});
	};

	return (
		<div className='header'>
			<nav className='navbar navbar-expand-lg navbar-light'>
				<div className='container-fluid'>
					<Logo />
					{currentPath === '/login' || currentPath === '/registration' ? (
						''
					) : (
						<div className='d-flex'>
							<strong className='username'>{userName}</strong>

							<Button
								buttonText={constantVariables.LOGOUT}
								className='btn btn-outline-danger'
								clickHandler={clickHandler}
							/>
						</div>
					)}
				</div>
			</nav>
		</div>
	);
}

export default Header;
