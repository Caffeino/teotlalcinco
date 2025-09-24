import {
	CalendarCheck,
	CreditCard,
	GalleryVerticalEnd,
	LayoutDashboard,
	MessagesSquare,
	type LucideIcon
} from 'lucide-react';

interface SideAdminRoutesType {
	id: string;
	label: string;
	icon: LucideIcon;
	path: string;
}

export const SIDE_ADMIN_ROUTES: SideAdminRoutesType[] = [
	{
		id: '01',
		label: 'Dashboard',
		icon: LayoutDashboard,
		path: '/admin/dashboard'
	},
	{
		id: '02',
		label: 'Blog Posts',
		icon: GalleryVerticalEnd,
		path: '/admin/posts'
	},
	{
		id: '03',
		label: 'Eventos',
		icon: CalendarCheck,
		path: '/admin/events'
	},
	{
		id: '04',
		label: 'Commentarios',
		icon: MessagesSquare,
		path: '/admin/comments'
	},
	{
		id: '04',
		label: 'Pagos',
		icon: CreditCard,
		path: '/admin/payments'
	}
];
