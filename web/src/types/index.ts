import type { ReactNode } from 'react';

export type RouteType = {
	index?: boolean;
	path?: string;
	element: ReactNode;
	state: string;
	displayText: string;
};

export interface AuthUserType {
	id: number;
	username: string;
	email: string;
	is_active: boolean;
	created_at?: string;
	role: RoleType;
	profile?: AuthProfileType;
	token: string;
}

export interface AuthProfileType {
	id: number;
	first_name: string;
	last_name: string;
	bio?: string;
	photo_url?: string;
	banner_url?: string;
	created_at: string;
	updated_at: string;
	type: ProfileType;
}

export interface ProfileType {
	id: number;
	type: string;
}

export interface RoleType {
	id: number;
	name: string;
	level: number;
}
