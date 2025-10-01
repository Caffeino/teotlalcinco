import REGISTER_LOGO from '../../../assets/register-logo.svg';
import { register } from '../../../lib/api/auth';
import { useForm } from '../../../lib/hooks/useForm';
import {
	validateEmail,
	validatePassword,
	validateUsername
} from '../../../lib/validations/user';
import GradientButton from '../../buttons/GradientButton';
import ErrorMessage from '../../common/ErrorMessage';
import InputGroup from '../../inputs/InputGroup';

interface RegisterFormData {
	username: string;
	email: string;
	password: string;
}

const initialValues: RegisterFormData = {
	username: '',
	email: '',
	password: ''
};

const SignUp = ({ displayTokenForm }: { displayTokenForm: () => void }) => {
	const onSubmit = async ({ username, email, password }: RegisterFormData) => {
		const user = await register(username, email, password);

		if (!user)
			throw new Error('Error al iniciar sesión, inténte de nuevo más tarde.');

		console.log('user registered', user);

		displayTokenForm();
	};

	const {
		values: formData,
		errors,
		error,
		isLoading,
		handleChange,
		handleSubmit
	} = useForm<RegisterFormData>({
		initialValues,
		validate,
		onSubmit
	});

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
				{error && <ErrorMessage error={error} />}
				<form onSubmit={handleSubmit}>
					<InputGroup
						label='Nombre de usuario'
						name='username'
						value={formData.username}
						onChange={handleChange}
						error={errors.username}
						type='text'
						placeholder='john'
					/>
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
						{isLoading ? 'Porcesando...' : 'Registrar'}
					</GradientButton>
				</form>
			</div>
		</div>
	);
};

const validate = (values: RegisterFormData) => {
	const errors: Partial<RegisterFormData> = {};

	const usernameErr = validateUsername(values.username);
	if (usernameErr) errors.username = usernameErr;

	const emailErr = validateEmail(values.email);
	if (emailErr) errors.email = emailErr;

	const passwordErr = validatePassword(values.password);
	if (passwordErr) errors.password = passwordErr;

	return errors;
};

export default SignUp;
