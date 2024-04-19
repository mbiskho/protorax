import * as React from 'react';
import { Link } from 'react-router-dom';

import { useFetch } from '../../../hooks/useFetch';
import Button from '../../../components/Button/Button';
import { Card } from '../../../components/Course/Card/Card';
import { Skeleton } from '../../../components/Course/Skeleton/Skeleton';
import Error from '../../../components/Error/Error';

export default function AllCourse() {
	const { data: courses, loading, error } = useFetch('/courses');
	return (
		<>
			<div className='d-flex justify-content-between align-items-start'>
				<div>
					<h1 className='fs-2 fw-bold' style={{ color: '#1c4a78' }}>
						Courses
					</h1>
					<p
						className='text-muted'
						style={{
							width: '100%',
							maxWidth: '40rem',
						}}>
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Accusantium unde necessitatibus, praesentium
						aspernatur.
					</p>
				</div>
				<div className=''>
					<Link to='/course/add' style={{ textDecoration: 'none' }}>
						<Button className='py-2 px-3'>
							<i className='fas fa-plus me-2'></i>
							<span
								style={{
									whiteSpace: 'nowrap',
								}}>
								Add Course
							</span>
						</Button>
					</Link>
				</div>
			</div>

			<div className='row py-4'>
				{loading &&
					[...Array(4)].map((_, index) => <Skeleton key={index} />)}

				{courses?.map((course) => (
					<Card key={course.id} {...course} />
				))}
			</div>

			{!loading && courses.length === 0 && (
				<div
					style={{
						width: '100%',
						minHeight: '20vh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<span className='text-muted'>No course available</span>
				</div>
			)}
		</>
	);
}
