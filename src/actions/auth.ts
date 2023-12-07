'use server';

import prisma from '@/db';
import { setAuthCookie } from '@/utils/auth';
import {
	EmailSchema,
	PasswordSchema,
	UsernameSchema,
} from '@/utils/validators/user';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';

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

	setAuthCookie({
		userId: user.id,
	});

	redirect('/');
};

const registerSchema = z
	.object({
		username: UsernameSchema,
		email: EmailSchema,
		password: PasswordSchema,
		confirmPassword: PasswordSchema,
		agreeToTermsOfServiceAndPrivacyPolicy: z.string({
			required_error:
				'You must agree to the terms of service and privacy policy',
			invalid_type_error:
				'You must agree to the terms of service and privacy policy',
		}),
	})
	.superRefine(
		(
			{
				confirmPassword,
				password,
				agreeToTermsOfServiceAndPrivacyPolicy,
			},
			ctx
		) => {
			if (confirmPassword !== password) {
				ctx.addIssue({
					path: ['confirmPassword'],
					code: 'custom',
					message: 'The passwords must match',
				});
			}
			if (agreeToTermsOfServiceAndPrivacyPolicy !== 'on') {
				ctx.addIssue({
					path: ['agreeToTermsOfServiceAndPrivacyPolicy'],
					code: 'custom',
					message:
						'You must agree to the terms of service and privacy policy',
				});
			}
		}
	);

interface RegisterFormState {
	fieldErrors: {
		username?: string[];
		email?: string[];
		password?: string[];
		confirmPassword?: string[];
		agreeToTermsOfServiceAndPrivacyPolicy?: string[];
	};
	formError: string | null;
}

export const register = async (
	_: LoginFormState,
	form: FormData
): Promise<RegisterFormState> => {
	const username = form.get('username');
	const password = form.get('password');
	const email = form.get('email');
	const confirmPassword = form.get('confirmPassword');
	const agreeToTermsOfServiceAndPrivacyPolicy = form.get(
		'agreeToTermsOfServiceAndPrivacyPolicy'
	);

	console.log(
		'agreeToTermsOfServiceAndPrivacyPolicy',
		agreeToTermsOfServiceAndPrivacyPolicy
	);
	const result = registerSchema.safeParse({
		username,
		password,
		email,
		confirmPassword,
		agreeToTermsOfServiceAndPrivacyPolicy,
	});
	if (!result.success) {
		return {
			fieldErrors: result.error.flatten().fieldErrors,
			formError: null,
		};
	}

	const [existingUsername, existingEmail] = await Promise.all([
		prisma.user.findUnique({
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
		}),
		prisma.user.findUnique({
			where: {
				email: result.data.email,
			},
			select: {
				id: true,
				password: {
					select: {
						hash: true,
					},
				},
			},
		}),
	]);
	if (existingUsername || existingEmail) {
		const field = existingUsername ? 'Username' : 'Email';
		return {
			fieldErrors: {},
			formError: `${field} already Exists`,
		};
	}

	const hash = await bcrypt.hash(result.data.password, 10);

	const user = await prisma.user.create({
		data: {
			username: result.data.username,
			email: result.data.email,
			password: {
				create: {
					hash,
				},
			},
		},
	});

	setAuthCookie({
		userId: user.id,
	});
	redirect('/');
};
