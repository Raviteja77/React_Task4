import React, { useState, useEffect } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { constantVariables } from '../../constants';
import { convertMinsToHrsMins } from '../../helpers/pipeDuration';
import './CourseForm.css';
import useNavigateToPage from '../../customHooks/useNavigateToPage';
import { useDispatch, useSelector } from 'react-redux';
import {
	removeAuthorInCourseAuthors,
	saveAuthorInCourseAuthor,
} from '../../services';
import {
	saveCourseInAllCourses,
	updateCourseInAllCourses,
} from '../../store/courses/thunk';
import { saveAuthorInAllAuthors } from '../../store/authors/thunk';
import {
	getAuthors,
	getCourseAuthors,
	getUserDetails,
	getCourses,
} from '../../helpers/selectors';
import { useParams } from 'react-router-dom';

function CourseForm() {
	const userData = useSelector(getUserDetails);
	const [courseAuthorsFromStore, setCourseAuthorsFromStore] = useState(
		useSelector(getCourseAuthors)
	);
	const [createAuthor, setCreateAuthor] = useState('');
	const authorsFromStore = useSelector(getAuthors);
	const [authorsList, setAuthorsList] = useState(authorsFromStore);
	const [calculateDuration, setCalculateDuration] = useState('');
	const [formDetails, setFormDetails] = useState({
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: '',
		authors: [],
	});
	const { courseId } = useParams();

	const courseDetails = useSelector(getCourses).filter(
		(course) => course.id === courseId
	);

	const navigateToCourses = useNavigateToPage('/courses');

	useEffect(() => {
		setAuthorsList(authorsFromStore);
	}, [authorsFromStore]);

	// To prefill the data in the form if admin wants to update the form
	useEffect(() => {
		if (courseDetails.length) {
			setFormDetails({
				...formDetails,
				title: courseDetails[0].title,
				description: courseDetails[0].description,
				duration: courseDetails[0].duration,
				authors: courseDetails[0].authors,
				id: courseDetails[0].id,
				creationDate: new Date()
					.toISOString()
					.slice(0, 10)
					.split('-')
					.reverse()
					.join('/'),
			});

			setAuthorsList(
				authorsList.filter(function (author) {
					return !courseDetails[0].authors.includes(author.id);
				})
			);

			setCourseAuthorsFromStore(
				authorsList.filter(function (author) {
					return courseDetails[0].authors.includes(author.id);
				})
			);

			setCalculateDuration(convertMinsToHrsMins(courseDetails[0].duration));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const dispatch = useDispatch();

	const createAuthorChange = (event) => {
		// Any change in author input will be stored in createAuthor
		setCreateAuthor(event.target.value);
	};

	const createAuthorHandler = () => {
		// Handles validation of author input.
		// checks if author exists and update store.
		if (createAuthor.length < 2) {
			alert('Please enter atleast 2 characters...');
			return;
		}
		let flag = true;
		authorsList.forEach((author) => {
			if (author.name.toLowerCase() === createAuthor.toLowerCase()) {
				alert(`Author ${createAuthor} already exists`);
				flag = false;
			}
		});
		if (flag) {
			dispatch(saveAuthorInAllAuthors(createAuthor, userData.result));
		}
	};

	const addAuthorHandler = (authorId, authorName) => {
		// Author added to te store for easy accessibility
		// And updates the component state hooks
		dispatch(
			saveAuthorInCourseAuthor({
				id: authorId,
				name: authorName,
			})
		);
		setAuthorsList(authorsList.filter((author) => author.id !== authorId));
		setCourseAuthorsFromStore([
			...courseAuthorsFromStore,
			{ id: authorId, name: authorName },
		]);
		setFormDetails({
			...formDetails,
			authors: [...formDetails.authors, authorId],
		});
	};

	const deleteAuthorHandler = (authorId, authorName) => {
		// Remove the author from the store.
		// updates component state hook (authorList)
		setAuthorsList([...authorsList, { id: authorId, name: authorName }]);
		dispatch(removeAuthorInCourseAuthors(authorId));
	};

	const durationHandler = (event) => {
		// Handles duration changes and convert mins to HrsMins format
		// Also updates the formDetails with neccessary data
		setCalculateDuration(convertMinsToHrsMins(event.target.value));
		setFormDetails({
			...formDetails,
			duration: parseInt(event.target.value),
		});
	};

	const submitHandler = () => {
		// Alerts if any detail misses otherwise create or update the course.
		if (
			formDetails.description !== '' &&
			formDetails.duration !== '' &&
			formDetails.title !== '' &&
			formDetails.authors.length !== 0 &&
			formDetails.description.length >= 2
		) {
			if (courseDetails.length) {
				dispatch(
					updateCourseInAllCourses(dispatch, formDetails, userData.result)
				).then(() => navigateToCourses());
			} else {
				dispatch(
					saveCourseInAllCourses(dispatch, formDetails, userData.result)
				).then(() => navigateToCourses());
			}
		} else {
			alert('Please, fill all details');
		}
	};

	return (
		<section className='create_course'>
			<div className='row m-2'>
				<div className='col-6'>
					<Input
						typeText={constantVariables.TEXT_TYPE}
						labelText={constantVariables.LABEL_TITLE}
						inputValue={formDetails.title}
						placeholderText={constantVariables.TITLE_PLACEHOLDER}
						changeHandler={(event) =>
							setFormDetails({ ...formDetails, title: event.target.value })
						}
					/>
				</div>
				<div className='col-6 text-end'>
					<Button
						buttonText={
							courseDetails.length
								? constantVariables.UPDATE_COURSE
								: constantVariables.CREATE_COURSE
						}
						className='btn btn-outline-primary mt-4'
						clickHandler={submitHandler}
					/>
				</div>
			</div>
			<div className='description'>
				<div>
					<label>Description</label>
				</div>
				<textarea
					name='description'
					className='description__text'
					defaultValue={formDetails.description}
					cols='160'
					minLength={2}
					rows='5'
					onChange={(event) =>
						setFormDetails({ ...formDetails, description: event.target.value })
					}
				/>
			</div>
			<div className='main-content'>
				<div className='row'>
					<div className='col-6'>
						<strong>Add Author</strong>
						<Input
							typeText={constantVariables.TEXT_TYPE}
							labelText={constantVariables.LABEL_AUTHOR_NAME}
							placeholderText='Enter author name...'
							changeHandler={createAuthorChange}
						/>
						<Button
							buttonText={constantVariables.CREATE_AUTHOR}
							className='btn btn-outline-primary m-5'
							clickHandler={createAuthorHandler}
						/>
					</div>
					<div className='col-6 text-center'>
						<strong>Authors</strong>
						{authorsList.map((author) => (
							<div className='row m-1' key={author.id}>
								<div className='col-6 text-end'>{author.name}</div>
								<div className='col-6 text-start'>
									<Button
										buttonText={constantVariables.ADD_AUTHOR}
										className='btn btn-outline-success'
										clickHandler={() =>
											addAuthorHandler(author.id, author.name)
										}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='row'>
					<div className='col-6'>
						<strong>Duration</strong>
						<Input
							typeText={constantVariables.NUMBER_TYPE}
							labelText={constantVariables.LABEL_DURATION}
							inputValue={formDetails.duration}
							placeholderText={constantVariables.DURATION_PLACEHOLDER}
							changeHandler={durationHandler}
						/>
					</div>
					<div className='col-6 text-center'>
						<div>
							<strong>Course authors</strong>
						</div>
						{courseAuthorsFromStore.length
							? courseAuthorsFromStore.map((author) => (
									<div className='row m-1' key={author.id}>
										<div className='col-6 text-end'>{author.name}</div>
										<div className='col-6 text-start'>
											<Button
												buttonText={constantVariables.DELETE_AUTHOR}
												className='btn btn-outline-danger'
												clickHandler={() =>
													deleteAuthorHandler(author.id, author.name)
												}
											/>
										</div>
									</div>
							  ))
							: 'Author list is empty'}
					</div>
				</div>
				<div>
					Duration: <strong>{calculateDuration}</strong>
				</div>
			</div>
		</section>
	);
}

export default CourseForm;
