import { Moon, Sun } from 'lucide-react';

const ThemeToggleButton = ({ checked }: { checked: boolean }) => {
	return (
		<>
			<label className='flex justify-center items-center select-none cursor-pointer'>
				<div className='flex items-center justify-center rounded-full dark:shadow-sm dark:shadow-zinc-700'>
					<input
						type='checkbox'
						name='theme'
						checked={checked}
						className='sr-only'
						readOnly
					/>
					{checked ? <Sun size={16} /> : <Moon size={16} />}
				</div>
			</label>
			{checked ? 'Light' : 'Dark'}
		</>
	);
};

export default ThemeToggleButton;
