import type { AuthUserType } from '../../types';
import { API_BASE_URL, apiRequest } from './api';

export const register = async (
	username: string,
	email: string,
	password: string
): Promise<AuthUserType | null> => {
	try {
		const res = await apiRequest(`${API_BASE_URL}/v1/auth/register`, {
			method: 'POST',
			body: JSON.stringify({ username, email, password })
		});

		if (!res.ok) return null;

		return await res.json();
	} catch (error) {
		console.log('Register error', error);
		return null;
	}
};

export const login = async (
	email: string,
	password: string
): Promise<AuthUserType | null> => {
	try {
		const res = await apiRequest(`${API_BASE_URL}/v1/auth/login`, {
			method: 'POST',
			body: JSON.stringify({ email, password })
		});

		if (!res.ok) return null;

		return await res.json();
	} catch (err) {
		console.log('Login error', err);
		return null;
	}
};

export const fetchUser = async (): Promise<AuthUserType | null> => {
	try {
		const res = await apiRequest(`${API_BASE_URL}/v1/users/profile`, {
			method: 'GET'
		});

		if (!res.ok) return null;

		return await res.json();
	} catch (err) {
		console.log('Error', err);
		return null;
	}
};
