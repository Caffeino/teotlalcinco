import { Navigate } from 'react-router-dom';
import { validUUID } from '../../lib/validations/user';
import AlertWithButtons from './AlertWithButtons';

const ConfirmActivation = ({
	token,
	handleActivation
}: {
	token: string;
	handleActivation: () => void;
}) => {
	return !validUUID(token) ? (
		<Navigate to='/' replace />
	) : (
		<AlertWithButtons
			type='primary'
			title='Activa tu cuenta!'
			buttons={
				<>
					<button
						type='button'
						onClick={handleActivation}
						className='text-white bg-linear-to-r from-sky-500 to-sky-600 hover:bg-linear-to-r hover:from-sky-500 hover:to-fuchsia-400 focus:ring-4 focus:outline-none focus:ring-sky-900 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex gap-2 items-center cursor-pointer'
					>
						Activar Cuenta
					</button>
				</>
			}
		>
			Hola nuevamente, para activar tu cuenta haz click en el siguiente
			bot&oacute;n de activaci&oacute;n.
		</AlertWithButtons>
	);
};

export default ConfirmActivation;
