import clsx from 'clsx';
import { Check, Info } from 'lucide-react';
import type { ReactNode } from 'react';

interface AlertWithButtonsProps {
	type: 'info' | 'warning' | 'success';
	title: string;
	buttons?: ReactNode;
	children: ReactNode;
}

const alertCls = {
	base: 'p-4 mb-4 rounded-lg',
	type: {
		info: {
			text: 'text-blue-800  dark:text-blue-400',
			border: 'border border-blue-300 dark:border-blue-800',
			background: 'bg-blue-50 dark:bg-gray-800',
			icon: <Info />
		},
		warning: {
			text: 'text-yellow-800  dark:text-yellow-300',
			border: 'border border-yellow-300 dark:border-yellow-800',
			background: 'bg-yellow-50 dark:bg-gray-800',
			icon: <Info />
		},
		success: {
			text: 'text-green-800  dark:text-green-300',
			border: 'border border-green-300 dark:border-green-800',
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
				<div className='mt-2 mb-4 text-sm'>{children}</div>
				{buttons && (
					<div className='flex items-center justify-end'>{buttons}</div>
				)}
			</div>
		</>
	);
};

export default AlertWithButtons;
