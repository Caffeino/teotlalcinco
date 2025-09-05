import clsx from 'clsx';
import type { ReactNode } from 'react';

interface ControlProps {
	leftValue: ReactNode | string;
	rightValue: ReactNode | string;
}

interface SwitchButtonProps {
	name: string;
	variant?: 'secondary';
	size?: 'lg';
	checked: boolean;
	toggleCheck: () => void;
	control: ControlProps;
}

const btnCls = {
	box: {
		base: 'rounded-full shadow-inner border',
		sizes: {
			lg: 'h-5 w-14'
		},
		variants: {
			secondary: {
				border: 'border-gray-200',
				bg: 'bg-slate-200',
				bgChecked: 'bg-white'
			}
		}
	},
	input: {
		base: 'absolute flex items-center justify-center rounded-full',
		sizes: {
			lg: '-top-1 h-7 w-7'
		},
		variants: {
			secondary: {
				border: 'border-gray-200',
				bg: 'bg-slate-800',
				bgChecked: 'bg-white'
			}
		}
	}
};

const SwitchButton = ({
	name,
	variant = 'secondary',
	size = 'lg',
	checked,
	toggleCheck,
	control
}: SwitchButtonProps) => {
	return (
		<>
			<label className='flex justify-center items-center cursor-pointer select-none'>
				<div className='relative'>
					<div
						className={clsx(
							btnCls.box.base,
							btnCls.box.sizes[size],
							btnCls.box.variants[variant].border,
							checked
								? btnCls.box.variants[variant].bgChecked
								: btnCls.box.variants[variant].bg
						)}
					>
						<div
							className={`${checked ? 'translate-x-8 duration-300 ease-in-out transition-all' : 'translate-x-0 duration-300 ease-in-out'}`}
						>
							<div
								className={clsx(
									btnCls.input.base,
									btnCls.input.sizes[size],
									checked
										? btnCls.input.variants[variant].bgChecked
										: btnCls.input.variants[variant].bg
								)}
							>
								<input
									type='checkbox'
									name={name}
									checked={checked}
									onChange={toggleCheck}
									className='sr-only'
								/>
								{checked ? control.rightValue : control.leftValue}
							</div>
						</div>
					</div>
				</div>
			</label>
		</>
	);
};

export default SwitchButton;
