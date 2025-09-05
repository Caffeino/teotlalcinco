import type { AuthUser } from '../../types';
import { API_BASE_URL, apiRequest } from './api';

export const login = async (
	email: string,
	password: string
): Promise<AuthUser | null> => {
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
