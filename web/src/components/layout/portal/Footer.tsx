import OLogo from '../../../assets/o-logo.svg';

const Footer = () => {
	return (
		<footer className='bg-white rounded-lg shadow-sm dark:bg-gray-900'>
			<div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
				<div className='sm:flex sm:items-center sm:justify-between'>
					<a
						href='/'
						className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'
					>
						<img src={OLogo} className='h-5' alt='Teotlalcinco Logo' />
						<span className='self-center text-slate-600 font-semibold font-michroma whitespace-nowrap dark:text-white'>
							Teotlal5
						</span>
					</a>
					<ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
						<li>
							<a href='#' className='hover:underline me-4 md:me-6'>
								Acerca De
							</a>
						</li>
						<li>
							<a href='#' className='hover:underline me-4 md:me-6'>
								Pol&iacute;tica & Privacidad
							</a>
						</li>
						<li>
							<a href='#' className='hover:underline me-4 md:me-6'>
								Licencia
							</a>
						</li>
						<li>
							<a href='#' className='hover:underline'>
								Contacto
							</a>
						</li>
					</ul>
				</div>
				<hr className='my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4' />
				<span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
					&copy; Teotlal5 - 2025
					<p>Todos los derechos reservados.</p>
				</span>
			</div>
		</footer>
	);
};

export default Footer;
