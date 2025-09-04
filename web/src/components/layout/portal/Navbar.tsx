import { MoveRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import publicRoutes from '../../../routes/public';
import Logo from '../../common/Logo';
import SignIn from '../../forms/auth/SignIn';
import Modal from '../../modal/Modal';

const Navbar = () => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<header className='flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium bg-white/50 dark:bg-gray-900/70'>
				<Logo />
				<nav className='flex items-center'>
					<ul className='flex gap-6 text-slate-800 dark:text-white sm:text-[1rem] font-semibold max-sm:w-60 max-sm:pl-10 max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-cyan-500 max-sm:text-white max-sm:pt-20 sm:items-center transition-all'>
						{publicRoutes.map((route, iKey) => {
							return (
								<li key={iKey}>
									<Link to={route.path!} className='sm:hover:text-primary'>
										{route.displayText}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
				<div>
					<button
						onClick={() => setOpenModal(true)}
						className='text-[1rem] max-sm:hidden flex items-center gap-2 px-6 py-2 text-white bg-linear-to-r from-primary to-sky-400 rounded-full cursor-pointer transition-all'
					>
						Login
						<MoveRight />
					</button>
				</div>
			</header>
			<Modal open={openModal} onClose={() => setOpenModal(false)} hideHeader>
				<SignIn />
			</Modal>
		</>
	);
};

export default Navbar;
