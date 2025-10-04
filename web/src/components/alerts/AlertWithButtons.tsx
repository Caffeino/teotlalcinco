import clsx from 'clsx';
import { Check, Info, UserCheck } from 'lucide-react';
import type { ReactNode } from 'react';

interface AlertWithButtonsProps {
	type: 'primary' | 'info' | 'warning' | 'success';
	title: string;
	buttons?: ReactNode;
	children: ReactNode;
}

const alertCls = {
	base: 'p-4 mb-4',
	type: {
		primary: {
			text: 'text-sky-700  dark:text-sky-400',
			border:
				'shadow-xs shadow-sky-300 border border-blue-300 dark:border-sky-800',
			background: 'bg-sky-50 dark:bg-sky-950/35',
			icon: <UserCheck />
		},
		info: {
			text: 'text-blue-800  dark:text-blue-400',
			border:
				'shadow-xs shadow-blue-300 border border-blue-300 dark:border-blue-800',
			background: 'bg-blue-50 dark:bg-gray-800',
			icon: <Info />
		},
		warning: {
			text: 'text-amber-600/95 dark:text-yellow-300',
			border:
				'shadow-xs shadow-yellow-300 border-t-6 border-amber-500 dark:border-yellow-800',
			background: 'bg-amber-100/10 dark:bg-gray-800',
			icon: <Info />
		},
		success: {
			text: 'text-green-800  dark:text-green-300',
			border:
				'shadow-xs shadow-green-300 border border-green-300 dark:border-green-800',
			background: 'bg-green-50 dark:bg-gray-800',
			icon: <Check />
		}
	}
};

const AlertWithButtons = ({
	type,
	title,
	buttons,
	children
}: AlertWithButtonsProps) => {
	return (
		<>
			<div
				className={clsx(
					alertCls.base,
					alertCls.type[type].text,
					alertCls.type[type].border,
					alertCls.type[type].background
				)}
			>
				<div className='flex items-center gap-2'>
					{alertCls.type[type].icon}
					<span className='sr-only'>Info</span>
					<h3 className='text-lg font-medium'>{title}</h3>
				</div>
				<div className='m-2 text-sm'>{children}</div>
				{buttons && (
					<div className='flex items-center justify-end'>{buttons}</div>
				)}
			</div>
		</>
	);
};

export default AlertWithButtons;
