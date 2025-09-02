import Logo from '../../common/Logo';

const Navbar = () => {
	return (
		<div className='flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium bg-white/50 dark:bg-gray-900/70'>
			<Logo />
		</div>
	);
};

export default Navbar;
