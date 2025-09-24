import type { ReactNode } from 'react';
import { Route } from 'react-router-dom';
import type { RouteType } from '../types';
import appRoutes from './appRoutes';

const generatePublicRoutes = (routes: RouteType[]): ReactNode => {
	return routes.map((route, iKey) => {
		return <Route key={iKey} path={route.path} element={route.element} />;
	});
};

const generatePrivateRoutes = (routes: RouteType[]): ReactNode => {
	return routes.map((route, iKey) => (
		<Route key={iKey} path={route.path} element={route.element} />
	));
};

export const publicRoutes: ReactNode = generatePublicRoutes(
	appRoutes.publicRoutes
);

export const privateRoutes: ReactNode = generatePrivateRoutes(
	appRoutes.privateRoutes
);
