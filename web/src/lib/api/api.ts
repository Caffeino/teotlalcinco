export const API_BASE_URL =
	import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const apiRequest = async (
	url: string,
	options: RequestInit
): Promise<Response> => {
	const token = localStorage.getItem('token');

	const defaultHeaders = {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	};

	const headers = token
		? { ...defaultHeaders, Authorization: `Bearer ${token}` }
		: defaultHeaders;

	return window.fetch(url, { ...options, headers });
};
