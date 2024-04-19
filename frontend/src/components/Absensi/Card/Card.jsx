import * as React from 'react';
import { formatCurrency } from '../../../lib/formatter';
import { Link } from 'react-router-dom';

export const Card = ({ ...course }) => {
	return (
		<Link
			to={`/absensi/${course.id}`}
			className='col-md-6 col-sm-4 col-xl-3 g-4 text-decoration-none'>
			<div
				className='card rounded-0'
				style={{
					position: 'relative',
					paddingBottom: '2rem',
				}}>
				<img
					src={course.photo || '/course.png'}
					className='card-img-top rounded-0'
					alt={course.name}
					style={{
						width: '100%',
						aspectRatio: '4/3',
						objectFit: 'cover',
					}}
				/>

				<div
					style={{
						position: 'absolute',
						left: '0',
						bottom: '0',
						width: '100%',
						borderTop: '1px solid #f0f0f0',
						padding: '0.5rem 1rem',
						fontSize: '0.9rem',
					}}
					className='d-flex justify-content-between align-items-center text-body-tertiary'>

					<div className='d-flex align-items-center'>
						<i className='fas fa-user me-1'></i>
						<span className='me-1 '>3</span>
						<span>Students</span>
					</div>
				</div>

				<div className='card-body'>

					<h5
						className='card-title fs-6'
						style={{
							height: '3rem',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: 2,
						}}>
						{course.name}
					</h5>
				</div>
			</div>
		</Link>
	);
};
