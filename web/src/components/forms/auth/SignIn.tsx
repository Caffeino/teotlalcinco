import LOGIN_LOGO from '../../../assets/login-logo.svg';
import GradientButton from '../../buttons/GradientButton';
import InputGroup from '../../inputs/InputGroup';

const SignIn = () => {
	return (
		<div className='flex items-center'>
			<div className='w-[90vw] lg:w-[22vw] md:w-[33vw] p-7 flex flex-col justify-center'>
				<h3 className='text-lg font-semibold text-slate-800'>Bienvenido!</h3>
				<p className='text-sm text-slate-700 mt-[2px] mb-6'>
					Ingrese sus datos para poder iniciar sesión.
				</p>
				<form onSubmit={() => {}}>
					<InputGroup
						label='Correo electr&oacute;nico'
						name='email'
						value=''
						onChange={() => {}}
						error=''
						placeholder='john@example.com'
					/>
					<InputGroup
						label='Contrase&ntilde;a'
						name='password'
						value=''
						onChange={() => {}}
						error=''
						type='password'
						placeholder='Min 8 caracteres'
					/>
					<GradientButton type='submit'>Iniciar sesi&oacute;n</GradientButton>
					<p className='text-[0.813rem] text-slate-800 mt-3'>
						¿A&uacute;n no tienes una cuenta?{' '}
						<button
							className='font-medium text-primary underline cursor-pointer'
							onClick={() => {}}
						>
							Crear una
						</button>
					</p>
				</form>
			</div>

			<div className='hidden md:block'>
				<img src={LOGIN_LOGO} alt='Login' className='h-[21.875rem] w-80 p-2' />
			</div>
		</div>
	);
};

export default SignIn;
