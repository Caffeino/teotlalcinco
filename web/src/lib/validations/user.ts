const REGEX = {
	USERNAME: /^[a-z0-9]+$/,
	START_WITH_NUMBER: /^[0-9]/,
	EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	UUID: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
};

export const validateUsername = (username: string) => {
	if (!REGEX.USERNAME.test(username)) return 'Solo letras minúsculas y números';

	if (REGEX.START_WITH_NUMBER.test(username))
		return 'No se puede iniciar con números';

	if (username.length < 3 || username.length > 15)
		return 'Tamaño requerido de 3 - 15 caracteres';
};

export const validateEmail = (email: string) => {
	if (!email || !REGEX.EMAIL.test(email))
		return 'Introduzca un correo electrónico válido';
};

export const validatePassword = (password: string) => {
	if (password.length < 8)
		return 'La contraseña debe contener al menos 8 caracteres';
};

export const validUUID = (uuid: string) => REGEX.UUID.test(uuid);
