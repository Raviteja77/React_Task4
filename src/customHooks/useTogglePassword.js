function useTogglePassword() {
	const password = document.getElementById('password');
	const type =
		password !== null
			? password.getAttribute('type') === 'password'
				? 'text'
				: 'password'
			: '';
	if (password !== null) password.setAttribute('type', type);
}

export default useTogglePassword;
