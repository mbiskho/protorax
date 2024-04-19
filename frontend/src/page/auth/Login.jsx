import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button/Button';
import './styles.css';

export default function Login() {
	const navigate = useNavigate();

	const { token, login } = useAuth();
	if (token) navigate('/', { replace: true });

	const [form, setForm] = useState({
		username: '',
		password: '',
		history: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		login({ form })
			.then(() => {
				Swal.fire({
					title: 'Auth Success',
					text: 'Welcome to the system',
					icon: 'success',
				});
			})
			.catch((error) => {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: error,
				});
			});
	};

	//handle logout
	const handleLogout = () => {
		localStorage.removeItem('token');
		alert('Logged out');
	};

	return (
		<div
			className='w-100 d-flex justify-content-center align-items-center'
			style={{
				height: '100vh',
				backgroundColor: '#1c4a78',
			}}>
			<form
				onSubmit={handleSubmit}
				className='rounded-3'
				style={{
					width: '100%',
					maxWidth: '500px',
					margin: 'auto',
					padding: '3rem',
				}}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginBottom: '3rem',
					}}>
					<img
						style={{ height: '2rem', margin: 'auto' }}
						src='https://cdn.discordapp.com/attachments/1152230774322499634/1230873445105926225/logo-hd-plego-removebg-preview-22x.png?ex=6634e739&is=66227239&hm=9a6b57413788bae79c9b2e7faf7b23c83dfeb204a5de186809425b6b1a195d9f&'
						alt='logo'
					/>
				</div>

				<div className='form-floating'>
					<input
						type='text'
						id='username'
						className='form-control'
						placeholder='Your username'
						onChange={(e) => {
							setForm({ ...form, username: e.target.value });
						}}
					/>
					<label htmlFor='username'>Username</label>
				</div>

				<div className='form-floating'>
					<input
						type='password'
						id='password'
						className='form-control'
						placeholder='Password'
						onChange={(e) => {
							setForm({ ...form, password: e.target.value });
						}}
					/>
					<label htmlFor='password'>Password</label>
				</div>

				<Button
					type='submit'
					className='w-100 mt-4 py-3 text-center'
					style={{
						color: 'white',
						backgroundColor: '#f0c232',
					}}>
					Sign in
				</Button>

				<p
					className='mt-5 text-center'
					style={{ color: 'white', fontSize: '0.9rem' }}>
					&copy; Plego 2024
				</p>
			</form>
		</div>
	);
}
