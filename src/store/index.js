import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/reducer';
import coursesReducer from './courses/reducer';
import authorsReducer from './authors/reducer';
import courseAuthorsReducer from './courseAuthor/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

// Combining all the reducers into one reducer.
const rootReducer = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorsReducer,
	courseAuthor: courseAuthorsReducer,
});

// To maintain state even after refreshing or reloading the page.
const persistedState = localStorage.getItem('store')
	? JSON.parse(localStorage.getItem('store'))
	: {};

// Creating the Redux store
const store = createStore(
	rootReducer,
	persistedState,
	composeWithDevTools(applyMiddleware(thunk))
);

// Subscribing the store for every update and reflecting
// the same in the local storage
store.subscribe(() => {
	localStorage.setItem('store', JSON.stringify(store.getState()));
});

export default store;
