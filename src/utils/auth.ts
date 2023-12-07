'use server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const setAuthCookie = ({ userId }: { userId: string }) => {
	const signedToken = jwt.sign({ userId }, process.env.COOKIE_SECRET ?? '', {
		expiresIn: '7d',
	});

	cookies().set({
		name: 'auth',
		value: signedToken,
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
	});
};
