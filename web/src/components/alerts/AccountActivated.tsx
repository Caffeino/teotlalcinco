import AlertWithButtons from './AlertWithButtons';

const AccountActivated = () => {
	return (
		<AlertWithButtons type='success' title='Enhorabuena, bienvenido!'>
			Tu cuenta ha sido activada. <br /> Gracias por unirte a nuestra comunidad!
			ahora ya puedes iniciar sesi&oacute;n con tu cuenta registrada.
		</AlertWithButtons>
	);
};

export default AccountActivated;
