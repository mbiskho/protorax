import * as React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

export default function HomeLayout() {
	return (
		<>
			<Navbar />
			<div className='container py-5' style={{ minHeight: '80vh' }}>
				<Outlet />
			</div>
			<Footer />
		</>
	);
}
