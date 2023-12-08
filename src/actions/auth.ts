'use server';

import * as auth from '@/auth';

import prisma from '@/db';
import {
	EmailSchema,
	NameSchema,
	PasswordSchema,
} from '@/utils/validators/user';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';

type LoginProvider = 'credentials' | 'github';

const loginSchema = z.object({
	email: EmailSchema,
	password: PasswordSchema,
});

interface LoginFormState {
	fieldErrors: {
		email?: string[];
		password?: string[];
	};
	formError: string | null;
}

export const login = async (
	provider: LoginProvider,
	_: LoginFormState,
	form: FormData
): Promise<LoginFormState> => {
	if (provider === 'github') {
		return auth.signIn('github');
	}
	const email = form.get('email');
	const password = form.get('password');
	const result = loginSchema.safeParse({ email, password });
	if (!result.success) {
		return {
			fieldErrors: result.error.flatten().fieldErrors,
			formError: null,
		};
	}

	try {
		await auth.signIn('credentials', { ...result.data, redirect: false });
	} catch (error) {
		console.log(error);
		return {
			fieldErrors: {},
			formError: 'Invalid Credentials',
		};
	}
	redirect('/');
};

const registerSchema = z
	.object({
		name: NameSchema,
		email: EmailSchema,
		password: PasswordSchema,
		confirmPassword: PasswordSchema,
		term: z.string({
			required_error:
				'You must agree to the terms of service and privacy policy',
			invalid_type_error:
				'You must agree to the terms of service and privacy policy',
		}),
	})
	.superRefine(({ confirmPassword, password, term }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				path: ['confirmPassword'],
				code: 'custom',
				message: 'The passwords must match',
			});
		}
		if (term !== 'on') {
			ctx.addIssue({
				path: ['term'],
				code: 'custom',
				message:
					'You must agree to the terms of service and privacy policy',
			});
		}
	});

interface RegisterFormState {
	fieldErrors: {
		name?: string[];
		email?: string[];
		password?: string[];
		confirmPassword?: string[];
		term?: string[];
	};
	formError: string | null;
}

export const register = async (
	_: LoginFormState,
	form: FormData
): Promise<RegisterFormState> => {
	const name = form.get('name');
	const password = form.get('password');
	const email = form.get('email');
	const confirmPassword = form.get('confirmPassword');
	const term = form.get('term');

	const result = registerSchema.safeParse({
		name,
		password,
		email,
		confirmPassword,
		term,
	});
	if (!result.success) {
		return {
			fieldErrors: result.error.flatten().fieldErrors,
			formError: null,
		};
	}

	const existingEmail = await prisma.user.findUnique({
		where: {
			email: result.data.email,
		},
		select: {
			id: true,
		},
	});
	if (existingEmail) {
		return {
			fieldErrors: {},
			formError: `Email already Exists`,
		};
	}

	const hash = await bcrypt.hash(result.data.password, 10);

	await prisma.user.create({
		data: {
			email: result.data.email,
			name: result.data.name,
			password: {
				create: {
					hash,
				},
			},
		},
	});
	try {
		await auth.signIn('credentials', {
			email: result.data.email,
			password: result.data.password,
			redirect: false,
		});
	} catch (error) {
		return {
			fieldErrors: {},
			formError: 'Invalid Credentials',
		};
	}
	redirect('/');
};
