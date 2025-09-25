import {
	CalendarCheck,
	CircleUser,
	CreditCard,
	GalleryVerticalEnd,
	LayoutDashboard,
	MessagesSquare,
	type LucideIcon
} from 'lucide-react';

interface SideAdminRoutesType {
	id: string;
	label: string;
	state: string;
	icon: LucideIcon;
	path: string;
}

export const SIDE_ADMIN_ROUTES: SideAdminRoutesType[] = [
	{
		id: '01',
		label: 'Dashboard',
		state: 'dashboard',
		icon: LayoutDashboard,
		path: '/admin/dashboard'
	},
	{
		id: '02',
		label: 'Perfil',
		state: 'Perfil',
		icon: CircleUser,
		path: '/admin/perfil'
	},
	{
		id: '03',
		label: 'Blog Posts',
		state: 'blog-posts',
		icon: GalleryVerticalEnd,
		path: '/admin/posts'
	},
	{
		id: '04',
		label: 'Eventos',
		state: 'events',
		icon: CalendarCheck,
		path: '/admin/events'
	},
	{
		id: '05',
		label: 'Commentarios',
		state: 'comments',
		icon: MessagesSquare,
		path: '/admin/comments'
	},
	{
		id: '06',
		label: 'Pagos',
		state: 'payments',
		icon: CreditCard,
		path: '/admin/payments'
	}
];
