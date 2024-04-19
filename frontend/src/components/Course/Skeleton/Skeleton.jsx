export const Skeleton = () => {
	return (
		<div className='col-sm-6 col-md-4 col-lg-3 p-2'>
			<div
				className='card'
				style={{
					position: 'relative',
					paddingBottom: '3rem',
				}}>
				<div
					className='skeleton'
					style={{
						width: '100%',
						aspectRatio: '4/3',
						objectFit: 'cover',
						backgroundColor: '#f0f0f0',
					}}></div>
				<div
					style={{
						position: 'absolute',
						left: '0',
						bottom: '0',
						width: '100%',
						border: '1px solid #f0f0f0',
						padding: '1rem',
					}}
					className='d-flex justify-content-between align-items-center text-body-tertiary'>
					<div className='d-flex align-items-center'>
						<i className='fas fa-star me-1'></i>
						<span>0</span>
					</div>

					<div className='d-flex align-items-center'>
						<i className='fas fa-user me-1'></i>
						<span className='me-1 '>0</span>
						<span>Students</span>
					</div>
				</div>

				<div className='card-body'>
					<div className='d-flex justify-content-between align-items-center mb-2'>
						<span
							className='badge text-bg-light'
							style={{
								color: '#8C94A3',
								backgroundColor: '#CED1D9',
							}}>
							Loading
						</span>
						<span className='text-muted fw-medium'>Loading</span>
					</div>

					<h5 className='card-title'>Loading</h5>
					<p className='card-text'>Loading</p>
					<p className='card-text'>
						<small className='text-muted'>Loading</small>
					</p>
				</div>
			</div>
		</div>
	);
};
