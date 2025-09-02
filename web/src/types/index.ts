import type { ReactNode } from 'react';

export type PublicRouteType = {
	index?: boolean;
	path?: string;
	element: ReactNode;
	state: string;
	displayText: string;
};

export type PageWrapperProps = {
	state?: string;
	children: ReactNode;
};
