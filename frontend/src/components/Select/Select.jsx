import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

export default function Select({ children, className, ...rest }) {
	return (
		<select
			className={clsx(
				'btn btn-primary d-flex align-items-center justify-content-center',
				className
			)}
			style={{
				color: 'black',
				backgroundColor: 'white',
				borderRadius: '10px',
				border: '2px solid',
                borderColor: '#E9EAF0',
				cursor: 'pointer',
                height: '40px',
				fontSize: '0.9rem',
				fontWeight: 'medium',
			}}
			{...rest}>
			{children}
		</select>
	);
}

Select.propTypes = {
	children: PropTypes.node.isRequired,
};
