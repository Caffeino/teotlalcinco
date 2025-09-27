import REGISTER_LOGO from '../../../assets/register-logo.svg';
import GradientButton from '../../buttons/GradientButton';
import InputGroup from '../../inputs/InputGroup';

const SignUp = () => {
	return (
		<div className='flex items-center'>
			<div className='hidden md:block'>
				<img src={REGISTER_LOGO} alt='Login' className='h-60 w-80 p-2' />
			</div>
			<div className='w-[90vw] lg:w-[22vw] md:w-[33vw] p-7 flex flex-col justify-center'>
				<h3 className='text-lg font-semibold text-slate-800 dark:text-slate-300'>
					&Uacute;nete a nuetra comunidad!
				</h3>
				<p className='text-sm text-slate-700 mt-[2px] mb-4 dark:text-slate-400'>
					Crea una nueva cuenta con los siguientes datos.
				</p>
				<form
					onSubmit={() => {
						console.log('processing...');
					}}
				>
					<InputGroup
						label='Nombre de usuario'
						name='text'
						value=''
						onChange={() => {}}
						error=''
						type='text'
						placeholder='john'
					/>
					<InputGroup
						label='Correo electr&oacute;nico'
						name='email'
						value=''
						onChange={() => {}}
						error=''
						type='text'
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
					<GradientButton type='submit'>Crear</GradientButton>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
