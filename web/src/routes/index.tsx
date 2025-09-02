import type { ReactNode } from 'react';
import { Route } from 'react-router-dom';
import PageWrapper from '../components/layout/portal/PageWrapper';
import type { PublicRouteType } from '../types';
import publicRoutes from './public';

const generateRoute = (routes: PublicRouteType[]): ReactNode => {
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

export const routes: ReactNode = generateRoute(publicRoutes);
