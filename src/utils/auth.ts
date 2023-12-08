import db from '@/db';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { EmailSchema, PasswordSchema } from './validators/user';

const loginSchema = z.object({
	email: EmailSchema,
	password: PasswordSchema,
});

export const verifyUserCredentials = async (
	credentials: Record<string, unknown>
): Promise<User | null> => {
	try {
		const result = loginSchema.safeParse(credentials);
		if (!result.success) return null;
		const { email, password } = result.data;
		const user = await db.user.findUnique({
			where: {
				email,
			},
			include: {
				password: {
					select: {
						hash: true,
					},
				},
			},
		});
		if (!user || !user.password) return null;
		const isPasswordMatch = await bcrypt.compare(
			password,
			user.password.hash
		);
		if (!isPasswordMatch) return null;
		const { password: storedPassword, ...userProps } = user;
		return userProps;
	} catch (error) {
		return null;
	}
};
