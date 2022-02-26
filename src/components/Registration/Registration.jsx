import React, { useState, useEffect } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { constantVariables } from '../../constants';
import './Registration.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLocalStorageToken from '../../customHooks/useLocalStorageToken';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faEye, faEyeSlash);

function Registration() {
	const [registrationFormDetails, setRegistrationFormDetails] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [isVisible, setIsVisible] = useState(false);

	const navigate = useNavigate();
	const token = useLocalStorageToken();

	const navigation = () => navigate('/login', { replace: true });

	useEffect(() => {
		// // Re-directs to courses page even clicking back button
		// if token is available localStorage
		if (token) navigation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const handleRegistrationDetails = (event) => {
		// Updates registrationFormDetails on any change in input fields
		// respective id will be picked to update data correctly
		const newRegistrationDetails = { ...registrationFormDetails };
		newRegistrationDetails[event.target.id] = event.target.value;
		setRegistrationFormDetails(newRegistrationDetails);
	};

	const postRegistrationDetails = (event) => {
		// Alert and navigate to login page on successful registration
		// otherwise alert the user
		event.preventDefault();
		axios
			.post('http://localhost:3000/register', {
				name: registrationFormDetails.name,
				email: registrationFormDetails.email,
				password: registrationFormDetails.password,
			})
			.then((response) => {
				alert('User created successfully');
				navigation();
			})
			.catch((error) => {
				alert('Please consider validations');
			});
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
		<form className='registration' onSubmit={postRegistrationDetails}>
			<h2 className='registration_title text-center'>
				{constantVariables.REGISTRATION}
			</h2>
			<Input
				id={constantVariables.LABEL_NAME.toLowerCase()}
				labelText={constantVariables.LABEL_NAME}
				placeholderText={constantVariables.NAME_PLACEHOLDER}
				typeText={constantVariables.TEXT_TYPE}
				changeHandler={handleRegistrationDetails}
			/>
			<Input
				id={constantVariables.LABEL_EMAIL.toLowerCase()}
				labelText={constantVariables.LABEL_EMAIL}
				placeholderText={constantVariables.EMAIL_PLACEHOLDER}
				typeText={constantVariables.EMAIL_TYPE}
				changeHandler={handleRegistrationDetails}
			/>
			<Input
				id={constantVariables.LABEL_PASSWORD.toLowerCase()}
				labelText={constantVariables.LABEL_PASSWORD}
				placeholderText={constantVariables.PASSWORD_PLACEHOLDER}
				typeText={constantVariables.PASSWORD_TYPE}
				changeHandler={handleRegistrationDetails}
			>
				{icon}
			</Input>
			<div className='registration_button text-center'>
				<Button
					buttonText={constantVariables.REGISTRATION}
					className='btn btn-outline-success'
					buttonType={constantVariables.SUBMIT_TYPE}
				/>
			</div>
			<div className='registration_note text-center'>
				<p>
					If you have an account you can <Link to='/login'>Login</Link>
				</p>
			</div>
		</form>
	);
}

export default Registration;
