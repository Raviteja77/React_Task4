import React, { useEffect, useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { constantVariables } from '../../constants';
import './Login.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PostUsers, getCurrentUser } from '../../store/user/thunk';
import { getUserDetails } from '../../helpers/selectors';
import useNavigateToPage from '../../customHooks/useNavigateToPage';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faEye, faEyeSlash);

function Login() {
	const [loginFormDetails, setLoginFormDetails] = useState({
		email: '',
		password: '',
	});

	const [isVisible, setIsVisible] = useState(false);

	const dispatch = useDispatch();

	const state = useSelector(getUserDetails);

	const navigateToCourses = useNavigateToPage('/courses');

	useEffect(() => {
		// Re-directs to courses page even clicking back button
		// if token is available localStorage
		if (state && state.successful) {
			navigateToCourses();
			dispatch(getCurrentUser(state.result));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	const handleLoginDetails = (event) => {
		// Updates loginFormDetails on any change in input fields
		// respective id will be picked to update data correctly
		const newLoginDetails = { ...loginFormDetails };
		newLoginDetails[event.target.id] = event.target.value;
		setLoginFormDetails(newLoginDetails);
	};

	const postLoginDetails = (event) => {
		// Get token from backend on successful post request
		// And navigate to courses page otherwise alert the user
		event.preventDefault();
		dispatch(PostUsers(loginFormDetails));
	};

	const useTogglePassword = () => {
		// To make the password visible
		const password = document.getElementById('password');
		const type =
			password !== null
				? password.getAttribute('type') === 'password'
					? 'text'
					: 'password'
				: '';
		if (password !== null) password.setAttribute('type', type);
		setIsVisible(!isVisible);
	};

	const icon = isVisible ? (
		<FontAwesomeIcon
			className='icon'
			icon={faEyeSlash}
			onClick={useTogglePassword}
		/>
	) : (
		<FontAwesomeIcon
			className='icon'
			icon={faEye}
			onClick={useTogglePassword}
		/>
	);

	return (
		<form className='login' onSubmit={postLoginDetails}>
			<h2 className='login_title text-center'>{constantVariables.LOGIN}</h2>
			<Input
				id={constantVariables.LABEL_EMAIL.toLowerCase()}
				labelText={constantVariables.LABEL_EMAIL}
				placeholderText={constantVariables.EMAIL_PLACEHOLDER}
				typeText={constantVariables.EMAIL_TYPE}
				changeHandler={handleLoginDetails}
			/>
			<Input
				id={constantVariables.LABEL_PASSWORD.toLowerCase()}
				labelText={constantVariables.LABEL_PASSWORD}
				placeholderText={constantVariables.PASSWORD_PLACEHOLDER}
				typeText={constantVariables.PASSWORD_TYPE}
				changeHandler={handleLoginDetails}
			>
				{icon}
			</Input>
			<div className='login_button text-center'>
				<Button
					buttonText={constantVariables.LOGIN}
					className='btn btn-outline-primary'
					buttonType={constantVariables.SUBMIT_TYPE}
				/>
			</div>
			<div className='login_note text-center'>
				<p>
					If you not have an account you can{' '}
					<Link to='/registration'>Register</Link>
				</p>
			</div>
		</form>
	);
}

export default Login;
