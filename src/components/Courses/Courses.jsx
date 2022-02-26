import React from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import { constantVariables } from '../../constants';
import './Courses.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, getRole } from '../../helpers/selectors';
import { useEffect } from 'react';
import {
	fetchCoursesAndAuthors,
	removeAllAuthorsInCourseAuthors,
} from '../../services';
import { useState } from 'react';

function Courses() {
	const dispatch = useDispatch();
	const coursesList = useSelector(getCourses);
	const [list, setList] = useState(coursesList);
	const [searchWord, setSearchWord] = useState('');
	const role = useSelector(getRole);
	useEffect(() => {
		if (!coursesList.length) {
			dispatch(fetchCoursesAndAuthors());
		}
		dispatch(removeAllAuthorsInCourseAuthors());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const listHandler = (keyword) => {
		// Handles the search operation
		// all courses will be available if search is empty
		// otherwise the searched text course will be shown
		setList(
			keyword === ''
				? coursesList
				: coursesList.filter(
						(course) =>
							course.title.toLowerCase().includes(keyword.toLowerCase()) ||
							course.id.toLowerCase().includes(keyword.toLowerCase())
				  )
		);
		setSearchWord(keyword);
	};

	return (
		<div className='courses'>
			<div className='row m-2'>
				<div className='col-8'>
					<SearchBar clickHandler={listHandler} />
				</div>
				<div className='col-4 text-end'>
					<Link to='/courses/add'>
						{role && role.toLowerCase() === 'admin' ? (
							<Button
								buttonText={constantVariables.ADD_NEW_COURSE}
								className='btn btn-outline-primary'
							/>
						) : (
							''
						)}
					</Link>
				</div>
			</div>
			<div className='courses_list'>
				{(searchWord.length ? list : coursesList).map((course) => (
					<CourseCard key={course.id} value={course} />
				))}
			</div>
		</div>
	);
}

export default Courses;
