import type { ReactNode } from 'react';
import { Route } from 'react-router-dom';
import AdmWrapper from '../components/layout/admin/AdmWrapper';
import PageWrapper from '../components/layout/portal/PageWrapper';
import type { RouteType } from '../types';
import appRoutes from './appRoutes';

const generatePublicRoutes = (routes: RouteType[]): ReactNode => {
	return routes.map((route, iKey) => {
		return (
			<Route
				key={iKey}
				path={route.path}
				element={
					<PageWrapper state={route.state ?? undefined}>
						{route.element}
					</PageWrapper>
				}
			/>
		);
	});
};

const generatePrivateRoutes = (routes: RouteType[]): ReactNode => {
	return routes.map((route, iKey) => (
		<Route
			key={iKey}
			path={route.path}
			element={
				<AdmWrapper state={route.state ?? undefined}>
					{route.element}
				</AdmWrapper>
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
