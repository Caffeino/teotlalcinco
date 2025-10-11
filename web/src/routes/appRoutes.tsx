import DashboardPage from '../pages/Admin/DashboardPage';
import ProfilePage from '../pages/Admin/ProfilePage';
import BlogPage from '../pages/Portal/BlogPage';
import EventPage from '../pages/Portal/EventPage';
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
		index: true,
		path: '/eventos',
		element: <EventPage state='events' />,
		state: 'events',
		displayText: 'Eventos'
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
	},
	{
		path: '/admin/perfil',
		element: <ProfilePage state='profile' />,
		state: 'profile',
		displayText: 'Perfil'
	}
];

const appRoutes: { publicRoutes: RouteType[]; privateRoutes: RouteType[] } = {
	publicRoutes,
	privateRoutes
};

export default appRoutes;
