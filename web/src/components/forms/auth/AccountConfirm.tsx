import { Forward, Info } from 'lucide-react';
import REGISTER_LOGO from '../../../assets/register-logo.svg';

const AccountConfirm = ({ email }: { email?: string }) => {
	return (
		<div className='max-w-lg'>
			<div className='p-8'>
				<img
					className='rounded-t-lg'
					src={REGISTER_LOGO}
					alt='account confirmation'
				/>
			</div>
			<div
				className='p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800'
				role='alert'
			>
				<div className='flex items-center gap-2'>
					<Info />
					<span className='sr-only'>Info</span>
					<h3 className='text-lg font-medium'>
						Verifica tu correo electr&oacute;nico
					</h3>
				</div>
				<div className='mt-2 mb-4 text-sm'>
					Hemos enviado un correo de confirmación a{' '}
					{email ? <b>{email}</b> : 'tu email'}. <br /> Por favor revise su
					bandeja de entrada y confirme que es usted quien desea unirse a
					nuestra comunidad.
				</div>
				<div className='flex'>
					<button
						type='button'
						className='gap-1 text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
					>
						<Forward size={18} />
						Reenviar
					</button>
				</div>
			</div>
		</div>
	);
};

export default AccountConfirm;
