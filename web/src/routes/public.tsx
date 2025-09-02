import BlogPage from '../pages/Portal/BlogPage';
import HomePage from '../pages/Portal/HomePage';
import type { PublicRouteType } from '../types';

const publicRoutes: PublicRouteType[] = [
	{
		index: true,
		path: '/',
		element: <HomePage />,
		state: 'home',
		displayText: 'Inicio'
	},
	{
		path: '/blog',
		element: <BlogPage />,
		state: 'home',
		displayText: 'Blog'
	}
];

export default publicRoutes;
