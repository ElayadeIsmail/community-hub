'use server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { Env } from './env';

const AUTH_COOKIE_NAME = 'auth';

export const setAuthCookie = ({ userId }: { userId: string }) => {
	const signedToken = jwt.sign({ userId }, Env.COOKIE_SECRET, {
		expiresIn: '7d',
	});

	cookies().set({
		name: AUTH_COOKIE_NAME,
		value: signedToken,
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
	});
};

export const isAuthenticated = (): boolean => {
	const token = cookies().get(AUTH_COOKIE_NAME)?.value ?? '';
	try {
		jwt.verify(token, Env.COOKIE_SECRET);
		return true;
	} catch (error) {
		return false;
	}
};
