import { useLocation } from 'react-router-dom';
import AlertWithButtons from './AlertWithButtons';

const PendingActivation = ({ email }: { email?: string }) => {
	const location = useLocation();

	const loginEmail = location.state?.email;
	const recipient = !loginEmail ? (email ?? null) : loginEmail;

	return (
		<AlertWithButtons type='info' title='Verifica tu correo electrónico'>
			{loginEmail
				? 'Ya se ha enviado previamente un correo de confirmación a '
				: 'Hemos enviado un correo de confirmación a '}
			{recipient ? <b>{recipient}</b> : 'tu email'}. <br /> Por favor revise su
			bandeja de entrada y confirme que es usted quien desea unirse a nuestra
			comunidad.
		</AlertWithButtons>
	);
};

export default PendingActivation;
