import type { ReactNode } from 'react';

export type RouteType = {
	index?: boolean;
	path?: string;
	element: ReactNode;
	state: string;
	displayText: string;
};

export interface AuthUser {
	userId: number;
	token: string;
}
