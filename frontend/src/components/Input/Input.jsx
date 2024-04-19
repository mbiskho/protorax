import * as React from 'react';

const Input = React.forwardRef(({ ...rest }, ref) => {
	return (
		<input
			className='form-control'
			style={{
				fontSize: '0.9rem',
			}}
			ref={ref}
			{...rest}
		/>
	);
});

Input.displayName = 'Input';

export default Input;
