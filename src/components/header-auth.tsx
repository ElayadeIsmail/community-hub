import * as actions from '@/actions';
import { auth } from '@/auth';
import paths from '@/lib/paths';
import Link from 'next/link';
import Profile from './profile';
import { Button } from './ui';

const HeaderAuth = async () => {
	const session = await auth();
	if (session?.user) {
		return (
			<>
				<Profile user={session?.user} />
				<form action={actions.logout}>
					<Button variant='secondary'>Logout</Button>
				</form>
			</>
		);
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
