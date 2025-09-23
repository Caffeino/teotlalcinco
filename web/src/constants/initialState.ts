import type {
	AuthProfileType,
	AuthUserType,
	ProfileType,
	RoleType
} from '../types';

export const ROLE_TYPE_INITIAL_STATE: RoleType = {
	id: 0,
	name: '',
	level: 0
};

export const PROFILE_TYPE_INITIAL_STATE: ProfileType = {
	id: 0,
	type: ''
};

export const INITIAL_PROFILE: AuthProfileType = {
	id: 0,
	first_name: '',
	last_name: '',
	bio: '',
	photo_url: '',
	banner_url: '',
	created_at: '',
	updated_at: '',
	type: PROFILE_TYPE_INITIAL_STATE
};

export const USER_PROFILE_INITIAL_STATE: AuthUserType = {
	id: 0,
	username: '',
	email: '',
	is_active: false,
	created_at: '',
	role: ROLE_TYPE_INITIAL_STATE,
	profile: INITIAL_PROFILE,
	token: ''
};
