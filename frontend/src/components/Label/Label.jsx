export default function Label({ children, ...rest }) {
	return (
		<label
			className='form-label fw-bold'
			style={{
				color: '#1c4a78',
				fontSize: '0.9rem',
			}}
			{...rest}>
			{children}
		</label>
	);
}
