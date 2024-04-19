import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
	return (
		<div
			style={{
				color: 'white',
				backgroundColor: '#1c4a78',
			}}>
			<div
				className='container px-4'
				style={{ position: 'relative', padding: '3rem 0 10rem 0' }}>
				<div
					style={{
						position: 'absolute',
						bottom: '0',
						left: '1.5rem',
						width: '400px',
						backgroundColor: '#f0c232',
						zIndex: '0',

						color: 'black',
						borderRadius: '10px 10px 0 0',
						fontSize: '14px',
					}}>
					<div className='row p-3'>
						<div className='col-6'>
							<div className='fw-medium'>Email</div>
							<div className='text-muted'>
								contact@website.com
							</div>
						</div>
						<div className='col-6'>
							<div className='fw-medium'>Telephone</div>
							<div className='text-muted'>+6288 999 222 333</div>
						</div>
					</div>
				</div>

				<div className='row'>
					<div className='col-md-4'>
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
						<p style={{ fontSize: '14px', opacity: '0.7' }}>
							Learning Management System
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
