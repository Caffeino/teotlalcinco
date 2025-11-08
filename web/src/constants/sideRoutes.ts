import {
	CreditCard,
	LayoutDashboard,
	Users,
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
		label: 'Usuarios',
		state: 'usuarios',
		icon: Users,
		path: '/admin/users'
	},
	{
		id: '03',
		label: 'Pagos',
		state: 'payments',
		icon: CreditCard,
		path: '/admin/payments'
	}
];
