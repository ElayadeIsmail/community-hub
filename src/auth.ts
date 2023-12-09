import db from '@/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import { verifyUserCredentials } from './utils/auth';
import { Env } from './utils/env';

export const {
	handlers: { GET, POST },
	auth,
	signOut,
	signIn,
} = NextAuth({
	adapter: PrismaAdapter(db),
	providers: [
		Github({
			clientId: Env.GITHUB_CLIENT_ID,
			clientSecret: Env.GITHUB_CLIENT_SECRET,
		}),
		CredentialsProvider({
			async authorize(credentials) {
				const user = await verifyUserCredentials(credentials);
				return user;
			},
		}),
	],
	callbacks: {
		// Usually not needed, here we are fixing a bug in nextauth
		async session({ session, user }: any) {
			if (session && user) {
				session.user.id = user.id;
			}

			return session;
		},
	},
});
