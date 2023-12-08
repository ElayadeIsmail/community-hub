'use client';
import paths from '@/utils/paths';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Profile from './Profile';
import { Button } from './ui';

const HeaderAuth = () => {
	const session = useSession();
	if (session.status === 'loading') {
		return <></>;
	} else if (session.data?.user) {
		return <Profile user={session.data?.user} />;
	} else {
		<>
			<Button asChild>
				<Link href={paths.login()}>Login</Link>
			</Button>
			<Button asChild variant='secondary'>
				<Link href={paths.register()}>Register</Link>
			</Button>
		</>;
	}
	return <div>HeaderAuth</div>;
};

export default HeaderAuth;
