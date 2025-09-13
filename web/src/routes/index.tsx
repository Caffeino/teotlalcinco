import type { ReactNode } from 'react';
import { Route } from 'react-router-dom';
import AdmLayout from '../components/layout/admin/AdmLayout';
import type { RouteType } from '../types';
import appRoutes from './appRoutes';

const generatePublicRoutes = (routes: RouteType[]): ReactNode => {
	return routes.map((route, iKey) => {
		return <Route key={iKey} path={route.path} element={route.element} />;
	});
};

const generatePrivateRoutes = (routes: RouteType[]): ReactNode => {
	return routes.map((route, iKey) => (
		<Route
			key={iKey}
			path={route.path}
			element={
				<AdmLayout state={route.state ?? undefined}>{route.element}</AdmLayout>
			}
		/>
	));
};

export const publicRoutes: ReactNode = generatePublicRoutes(
	appRoutes.publicRoutes
);

export const privateRoutes: ReactNode = generatePrivateRoutes(
	appRoutes.privateRoutes
);
