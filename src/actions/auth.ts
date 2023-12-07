'use server';

import prisma from '@/db';
import { PasswordSchema, UsernameSchema } from '@/utils/validators/user';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const COOKIES_AUTH_EXPIRATION = 7 * 24 * 60 * 60 * 1000;

const loginSchema = z.object({
	username: UsernameSchema,
	password: PasswordSchema,
});

interface LoginFormState {
	fieldErrors: {
		username?: string[];
		password?: string[];
	};
	formError: string | null;
}

export const login = async (
	_: LoginFormState,
	form: FormData
): Promise<LoginFormState> => {
	const username = form.get('username');
	const password = form.get('password');
	const result = loginSchema.safeParse({ username, password });
	if (!result.success) {
		return {
			fieldErrors: result.error.flatten().fieldErrors,
			formError: null,
		};
	}

	const user = await prisma.user.findUnique({
		where: {
			username: result.data.username,
		},
		select: {
			id: true,
			password: {
				select: {
					hash: true,
				},
			},
		},
	});
	if (!user || !user.password) {
		return {
			fieldErrors: {},
			formError: 'Invalid Credentials',
		};
	}

	const isPasswordMatches = await bcrypt.compare(
		result.data.password,
		user.password.hash
	);

	if (!isPasswordMatches) {
		return {
			fieldErrors: {},
			formError: 'Invalid Credentials',
		};
	}

	cookies().set({
		name: 'userId',
		value: user.id,
		httpOnly: true,
		path: '/',
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		expires: COOKIES_AUTH_EXPIRATION,
	});
	redirect('/');
};
