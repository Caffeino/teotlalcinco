import AlertWithButtons from './AlertWithButtons';

const PendingActivation = ({
	fromLogin,
	recipient
}: {
	fromLogin: boolean;
	recipient?: string;
}) => {
	return (
		<AlertWithButtons type='info' title='Verifica tu correo electrónico'>
			{fromLogin
				? 'Ya se ha enviado previamente un correo de confirmación a '
				: 'Hemos enviado un correo de confirmación a '}
			{recipient ? <b>{recipient}</b> : 'tu email'}. <br /> Por favor revise su
			bandeja de entrada y confirme que es usted quien desea unirse a nuestra
			comunidad.
		</AlertWithButtons>
	);
};

export default PendingActivation;
