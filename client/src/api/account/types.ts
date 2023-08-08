export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	confirmedAt: string;
	isAdmin: boolean;
	bio: string;
	house?: {
		name: string;
	}
}

export interface Session {
	context: 'session';
	insertedAt: string;
	token: string;
	trackingId: string;
}

export interface SignUpPayload {
	email: string;
	first_name: string;
	last_name: string;
	password: string;
	house_id: number;
}

export interface SignInPayload {
	email: string;
	password: string;
}
