import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const buttonClasses = {
	base: 'rounded-md cursor-pointer disabled:opacity-50',
	variants: {
		primary: 'bg-primary hover:bg-blue-600/80 text-white',
		secondary:
			'border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
	},
	sizes: {
		default: 'px-4 py-2',
		small: 'px-3 py-1 text-sm'
	}
};

const Button = ({
	children,
	icon,
	variant = 'primary',
	size = 'default',
	...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
	icon?: ReactNode;
	variant?: 'primary' | 'secondary';
	size?: 'default' | 'small';
}) => {
	return (
		<button
			className={clsx(
				buttonClasses.base,
				buttonClasses.variants[variant],
				buttonClasses.sizes[size],
				icon && 'flex items-center gap-2'
			)}
			{...props}
		>
			{icon}
			{children}
		</button>
	);
};

export default Button;
