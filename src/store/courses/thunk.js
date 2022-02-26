import axios from 'axios';
import {
	addCourseSuccess,
	addCourseFailure,
	deleteCourseSuccess,
	deleteCourseFailure,
	updateCourseSuccess,
	updateCourseFailure,
} from './actionCreator';

// All the operations on the courses will only be
// successful if and only if user is authorized.
// Also Redux store will be updated by dispatching the functions
// based on the response from backend.

// Add new course to the backend.
// Also returning a promise to make sure other
// functions being called only after course added successfully
export const saveCourseInAllCourses = (
	dispatch,
	courses,
	authorizationToken
) => {
	return () => {
		return Promise.resolve(
			axios
				.post(
					'http://localhost:3000/courses/add',
					{
						title: courses.title,
						description: courses.description,
						duration:
							typeof courses.duration === 'string'
								? parseInt(courses.duration)
								: courses.duration,
						authors: courses.authors,
					},
					{
						headers: { Authorization: authorizationToken },
					}
				)
				.then((response) => {
					alert(
						`New course ${courses.title.toUpperCase()} created successfully`
					);
					dispatch(addCourseSuccess(response.data.result));
				})
				.catch((error) => {
					dispatch(addCourseFailure(error));
				})
		);
	};
};

// Removing the course from the backend.
export const deleteCourseFromAllCourses = (courseId, authorizationToken) => {
	return (dispatch) => {
		axios
			.delete(`http://localhost:3000/courses/${courseId}`, {
				headers: { Authorization: authorizationToken },
			})
			.then((response) => {
				dispatch(deleteCourseSuccess(courseId));
			})
			.catch((error) => {
				dispatch(deleteCourseFailure(error));
			});
	};
};

// Updating the existing course in the backend.
// Also returning a promise to make sure other
// functions being called only after course updated successfully
export const updateCourseInAllCourses = (
	dispatch,
	updateCourse,
	authorizationToken
) => {
	return () => {
		return Promise.resolve(
			axios
				.put(
					`http://localhost:3000/courses/${updateCourse.id}`,
					{
						title: updateCourse.title,
						description: updateCourse.description,
						duration:
							typeof updateCourse.duration === 'string'
								? parseInt(updateCourse.duration)
								: updateCourse.duration,
						authors: updateCourse.authors,
					},
					{
						headers: { Authorization: authorizationToken },
					}
				)
				.then((response) => {
					alert(`Updated ${updateCourse.title.toUpperCase()} successfully`);
					dispatch(updateCourseSuccess(response.data.result));
				})
				.catch((error) => {
					dispatch(updateCourseFailure(error));
				})
		);
	};
};
