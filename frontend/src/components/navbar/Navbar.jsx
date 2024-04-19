import React, { useState, startTransition } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { useAuth } from '../../hooks/useAuth';
import Swal from 'sweetalert2';

export const Navbar = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const [cookies, setCookie] = useCookies() || { user: "user" };
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};		

	const handleLogout = async () => {
		logout()
			.then(() => {
				Swal.fire({
					title: 'Logged out',
					icon: 'success',
				});
				navigate('/auth', { replace: true });
			})
			.catch((error) => {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: error,
				});
			});
	};

	return (
		<nav
			className='navbar navbar-expand-lg'
			style={{
				color: 'white',
				backgroundColor: '#397da7',
				padding: '1rem 0',
			}}>
			<div className='container'>
				<Link to='/'>
					<img
						src='https://cdn.discordapp.com/attachments/1152230774322499634/1230873445105926225/logo-hd-plego-removebg-preview-22x.png?ex=6634e739&is=66227239&hm=9a6b57413788bae79c9b2e7faf7b23c83dfeb204a5de186809425b6b1a195d9f&'
						alt='Logo HD plego'
						style={{
							height: '28px',
							marginRight: '20px',
						}}
					/>
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbar'
					aria-controls='navbar'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div
					className='collapse navbar-collapse d-lg-flex justify-content-between'
					id='navbar'>
					<ul className='navbar-nav'>
						{links.map((link, index) => (
							<li key={index} className='nav-item'>
								<Link
									className='nav-link'
									to={link.to}
									style={{ color: 'white' }}>
									{link.label}
								</Link>
							</li>
						))}
					</ul>

					<ul className='navbar-nav'>
						<li className='nav-item me-3 row align-items-center'>
							<Link className='nav-link' to={'/announcement'}>
								<i class="fa-solid fa-bell fs-4" style={{color: 'white'}}></i>
							</Link>
						</li>
						<li className='row align-items-center nav-item '>
							<div className='col'>
								<img
									src="https://picsum.photos/seed/picsum/200/200"
									className="rounded-5 "
									style={{
									height: 40,
									}}
									alt="profile"
								></img>
							</div>
							<div className='col'>
								<Button className='col btn btn-secondary dropdown-toggle' onClick={toggleMenu} >
									{cookies.name ? cookies.name : <p>user</p>}
								</Button>
								<ul
									className="dropdown-menu"
									style={{ display: isMenuOpen ? "block" : "none" }}
								>
									<li>
									<button
										className="dropdown-item"
										type="button"
										onClick={handleLogout}
									>
										Logout
									</button>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

const links = [
	{ to: '/', label: 'Home' },
	{ to: '/course', label: 'Course' },
	{ to: '/payment-collection', label: 'Payment' },
	{ to: '/users', label: 'User Management' },
	{ to: '/absensi', label: 'Absensi' },
];

export default Navbar;
