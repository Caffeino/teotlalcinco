import { Key } from 'lucide-react';
import AlertWithButtons from './AlertWithButtons';

const ExpiredToken = () => {
	return (
		<AlertWithButtons
			type='warning'
			title='Token no válido!'
			buttons={
				<>
					<button
						type='button'
						className='text-white bg-amber-500 border border-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-full text-sm px-3 py-1.5 me-2 text-center inline-flex gap-2 items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800 cursor-pointer'
					>
						<Key size={16} />
						Solicitar Token
					</button>
				</>
			}
		>
			El token no es v&aacute;lido o probablemente ya ha expirado. <br />
			Es necesario solicitar uno nuevo con su correo electr&oacute;nico
			registrado previamente. Haz click en el siguiente enlace para solicitarlo.
		</AlertWithButtons>
	);
};

export default ExpiredToken;
