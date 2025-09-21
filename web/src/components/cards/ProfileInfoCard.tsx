import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/hooks/useAuth';

const ProfileInfoCard = () => {
	const navigate = useNavigate();
	const { auth, authLogout } = useAuth();

	const handleLogout = () => {
		authLogout();
		navigate('/');
	};

	return (
		<div className='flex items-center'>
			{/* <img
				src={''}
				alt='user-profile-img'
				className='w-11 h-11 bg-gray-300 rounded-full mr-3'
			/> */}
			<div>
				<div className='text-sm font-semibold leading-3 hover:text-primary dark:text-white cursor-pointer'>
					{auth?.username}
				</div>
				<button
					className='text-sm font-normal hover:underline hover:text-primary dark:text-white cursor-pointer'
					onClick={() => handleLogout()}
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default ProfileInfoCard;
