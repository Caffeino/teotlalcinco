import DashboardPage from '../pages/Admin/DashboardPage';
import BlogPage from '../pages/Portal/BlogPage';
import HomePage from '../pages/Portal/HomePage';
import type { RouteType } from '../types';

const publicRoutes: RouteType[] = [
	{
		index: true,
		path: '/',
		element: <HomePage state='home' />,
		state: 'home',
		displayText: 'Inicio'
	},
	{
		path: '/blog',
		element: <BlogPage state='blog' />,
		state: 'blog',
		displayText: 'Blog'
	}
];

const privateRoutes: RouteType[] = [
	{
		index: true,
		path: '/admin/dashboard',
		element: <DashboardPage state='dashboard' />,
		state: 'dashboard',
		displayText: 'Dashboard'
	}
];

const appRoutes: { publicRoutes: RouteType[]; privateRoutes: RouteType[] } = {
	publicRoutes,
	privateRoutes
};

export default appRoutes;
