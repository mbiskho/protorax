import * as React from 'react';

import axios from '../lib/axios';
import { AxiosError } from 'axios';
import { useAuth } from './useAuth';

export function useFetch(url) {
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(null);

	const { token } = useAuth();

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setData(data.data);
			} catch (error) {
				if (error instanceof AxiosError)
					setError(error?.response?.data?.message);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, setData, loading, error };
}
