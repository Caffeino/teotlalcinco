import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const buttonClasses = {
	base: 'w-full gap-3 text-sm font-semibold rounded-md transition-all hover:scale-[1.01] hover:text-white cursor-pointer',
	variants: {
		primary: 'text-white bg-linear-to-r from-primary to-sky-400',
		secondary:
			'border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
	},
	sizes: {
		default: 'py-3',
		small: 'px-3 py-1'
	}
};

const GradientButton = ({
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

export default GradientButton;
