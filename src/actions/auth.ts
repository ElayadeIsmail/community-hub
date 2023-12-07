'use server';

import { z } from 'zod';

const loginSchema = z.object({
	username: z
		.string()
		.min(3)
		.regex(/^[a-z-]+$/),
});

export const login = async (form: FormData) => {
	const username = form.get('username');
	const password = form.get('password');

	console.log({ username, password });
};
