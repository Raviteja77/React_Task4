import React from 'react';
import './CourseInfo.css';
import { useParams } from 'react-router-dom';
import { convertMinsToHrsMins } from '../../helpers/pipeDuration';
import Button from '../../common/Button/Button';
import { constantVariables } from '../../constants';
import useNavigateToPage from '../../customHooks/useNavigateToPage';
import useAuthorsIdToGetName from '../../customHooks/useAuthorsIdToGetName';
import { useSelector } from 'react-redux';
import { getCourses } from '../../helpers/selectors';

function CourseInfo() {
	const { courseId } = useParams();

	const navigation = useNavigateToPage('/courses');

	const courseDetails = useSelector(getCourses).filter(
		(course) => course.id === courseId
	);

	const navigateToCourses = () => navigation();

	const authors = useAuthorsIdToGetName(
		courseDetails.length ? courseDetails[0].authors : []
	);

	return courseDetails.length ? (
		<div className='course_info'>
			<Button
				buttonType={constantVariables.BUTTON_TYPE}
				buttonText={constantVariables.BACK}
				className='btn btn-outline-secondary'
				clickHandler={navigateToCourses}
			/>
			<div className='course_info_title text-center'>
				<h1>{courseDetails[0].title}</h1>
			</div>
			<div className='row'>
				<div className='col-6'>{courseDetails[0].description}</div>
				<div className='col-6'>
					<div>
						<strong>ID</strong>: {courseDetails[0].id}
					</div>
					<div>
						<strong>Duration</strong>:
						{convertMinsToHrsMins(courseDetails[0].duration)}
					</div>
					<div>
						<strong>Created</strong>: {courseDetails[0].creationDate}
					</div>
					<div>
						<strong>Authors</strong>:{authors.join(', ')}
					</div>
				</div>
			</div>
		</div>
	) : (
		<div>No course found</div>
	);
}

export default CourseInfo;
