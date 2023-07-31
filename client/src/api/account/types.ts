export interface User {
	id: number;
	firstName: string;
	email: string;
	confirmedAt: string;
	isAdmin: boolean;
}

export interface Session {
	context: 'session';
	insertedAt: string;
	token: string;
	trackingId: string;
}

export interface SignUpPayload {
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	password: string;
}

export interface SignInPayload {
	email: string;
	password: string;
}
