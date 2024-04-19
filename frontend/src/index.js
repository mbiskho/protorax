import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './hooks/useAuth';
import './styleguide.css';
import './style.css';
import AppRouter from './route/Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	</React.StrictMode>
);
