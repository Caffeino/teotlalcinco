import { CircleUserRound, Gauge, type LucideIcon } from 'lucide-react';

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
		icon: Gauge,
		path: '/admin/dashboard'
	},
	{
		id: '02',
		label: 'Profile',
		icon: CircleUserRound,
		path: '/admin/profile'
	}
];
