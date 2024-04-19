export default function Error({ children }) {
	return (
		<p className='text-danger mt-1' style={{ fontSize: '0.8rem' }}>
			{children}
		</p>
	);
}
