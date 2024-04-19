import * as React from 'react';
import axios from '../lib/axios';
import { AxiosError } from 'axios';

const AuthContext = React.createContext();

const useLocalStorage = (key, initialValue) => {
	const [storedValue, setStoredValue] = React.useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	});

	const setValue = (value) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue];
};

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useLocalStorage('token', null);

	const login = async ({ form }) => {
		try {
			const { data } = await axios.post('/login', form);
			setToken(data.token);
			window.localStorage.setItem('userData', JSON.stringify(data.user));
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
			throw new Error(error.message);
		}
	};

	const logout = async () => {
		try {
			// should post logout here
			setToken(null);
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
			throw new Error(error.message);
		}
	};

	return (
		<AuthContext.Provider value={{ token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return React.useContext(AuthContext);
};
