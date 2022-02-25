function useLocalStorageToken() {
	const store = JSON.parse(localStorage?.getItem('store'));
	if (store && store.user) {
		const state = store['user'];
		return state ? state.userDetails.result : '';
	}
}

export default useLocalStorageToken;
