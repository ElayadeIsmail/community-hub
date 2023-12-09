'use client';
import paths from '@/lib/paths';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Profile from './Profile';
import { Button } from './ui';

const HeaderAuth = () => {
	const session = useSession();
	console.log({ session });
	if (session.status === 'loading') {
		return <></>;
	} else if (session.data?.user) {
		return <Profile user={session.data?.user} />;
	} else {
		return (
			<>
				<Button asChild>
					<Link href={paths.login()}>Login</Link>
				</Button>
				<Button asChild variant='secondary'>
					<Link href={paths.register()}>Register</Link>
				</Button>
			</>
		);
	}
};

export default HeaderAuth;
