const REGEX = {
	USERNAME: /^[a-z0-9]+$/,
	START_WITH_NUMBER: /^[0-9]/,
	EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

export const validateEmail = (email: string) => {
	if (!email || !REGEX.EMAIL.test(email))
		return 'Introduzca un correo electrónico válido';
};

export const validatePassword = (password: string) => {
	if (password.length < 8)
		return 'La contraseña debe contener al menos 8 caracteres';
};
