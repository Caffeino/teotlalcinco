import { useNavigate } from 'react-router-dom';
import LOGIN_LOGO from '../../../assets/login-logo.svg';
import { login } from '../../../lib/api/auth';
import { useAuth } from '../../../lib/hooks/useAuth';
import { useForm } from '../../../lib/hooks/useForm';
import { validateEmail, validatePassword } from '../../../lib/validations/user';
import GradientButton from '../../buttons/GradientButton';
import ErrorMessage from '../../common/ErrorMessage';
import InputGroup from '../../inputs/InputGroup';

interface SignInForm {
	email: string;
	password: string;
}

const initialValues: SignInForm = {
	email: '',
	password: ''
};

const SignIn = ({ onCloseAuthForm }: { onCloseAuthForm: () => void }) => {
	const { authLogin } = useAuth();
	const navigate = useNavigate();

	const onSubmit = async ({ email, password }: SignInForm) => {
		const user = await login(email, password);

		if (!user)
			throw new Error('Error al iniciar sesión, inténte de nuevo más tarde.');

		onCloseAuthForm();

		if (!user.is_active) {
			navigate('/bienvenido/verify', {
				replace: true,
				state: { email }
			});
			return;
		}

		authLogin(user);

		if (user.role.level === 1)
			return navigate('/admin/dashboard', { replace: true });

		return navigate(`/perfil/${user.username}`, { replace: true });
	};

	const {
		values: formData,
		errors,
		error,
		isLoading,
		handleChange,
		handleSubmit
	} = useForm<SignInForm>({ initialValues, validate, onSubmit });

	return (
		<div className='flex items-center'>
			<div className='w-[90vw] lg:w-[22vw] md:w-[33vw] p-7 flex flex-col justify-center'>
				<h3 className='text-lg font-semibold text-slate-800 dark:text-slate-300'>
					Bienvenido!
				</h3>
				<p className='text-sm text-slate-700 mt-[2px] mb-4 dark:text-slate-400'>
					Ingrese sus datos para poder iniciar sesi&oacute;n.
				</p>
				{error && <ErrorMessage error={error} />}
				<form onSubmit={handleSubmit}>
					<InputGroup
						label='Correo electr&oacute;nico'
						name='email'
						value={formData.email}
						onChange={handleChange}
						error={errors.email}
						type='text'
						placeholder='john@example.com'
					/>
					<InputGroup
						label='Contrase&ntilde;a'
						name='password'
						value={formData.password}
						onChange={handleChange}
						error={errors.password}
						type='password'
						placeholder='Min 8 caracteres'
					/>
					<GradientButton type='submit' disabled={isLoading}>
						{isLoading ? 'Iniciando...' : 'Iniciar sesión'}
					</GradientButton>
					<p className='text-[0.813rem] text-slate-800 mt-3 dark:text-slate-300 flex gap-2'>
						¿A&uacute;n no tienes una cuenta?{' '}
						<button
							type='button'
							className='font-semibold text-primary dark:text-sky-500 underline cursor-pointer'
							onClick={() => {
								navigate('/bienvenido', { replace: true });
								onCloseAuthForm();
							}}
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

const validate = (values: SignInForm) => {
	const errors: Partial<SignInForm> = {};

	const emailErr = validateEmail(values.email);
	if (emailErr) errors.email = emailErr;

	const passwordErr = validatePassword(values.password);
	if (passwordErr) errors.password = passwordErr;

	return errors;
};

export default SignIn;
