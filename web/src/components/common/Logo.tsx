import OLogo from '../../assets/o-logo.svg';

const Logo = () => {
	return (
		<div className='flex flex-row items-center leading-none gap-0.5'>
			<p className='lg:text-[1.8rem] md:text-[1.45rem] sm:text-[1.45rem] font-michroma font-semibold text-slate-800'>
				Te
			</p>
			<img
				src={OLogo}
				alt='logo'
				className='h-[1.75rem] md:h-[1.5rem] sm:[1.45rem] top-0.5 relative'
			/>
			<p className='lg:text-[1.8rem] md:text-[1.45rem] sm:text-[1.45rem] font-michroma font-semibold text-slate-800'>
				tlal5
			</p>
		</div>
	);
};

export default Logo;
