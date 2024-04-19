import * as React from 'react';

export const NotFound = () => {
	return (
		<div
			className='d-flex flex-column justify-content-center align-items-center'
			style={{ height: '80vh' }}>
			<h1
				className='fw-bold'
				style={{
					color: '#1a4570',
				}}>
				404 Not Found
			</h1>
			<p>Sorry, the page you are looking for could not be found.</p>
		</div>
	);
};
