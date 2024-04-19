import * as React from 'react';

const Textarea = React.forwardRef(({ ...rest }, ref) => {
	return (
		<textarea
			className='form-control'
			style={{
				fontSize: '0.9rem',
			}}
			ref={ref}
			{...rest}
		/>
	);
});

Textarea.displayName = 'Textarea';

export default Textarea;
