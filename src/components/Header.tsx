import paths from '@/utils/paths';
import Link from 'next/link';
import { Button } from './ui';

const Header = () => {
	return (
		<header className='container flex items-center justify-between h-14 border-b'>
			<Link href={paths.home()} className='text-primary font-bold italic'>
				Community Hub
			</Link>
			<nav className='flex space-x-3'>
				<Button asChild>
					<Link href={paths.login()}>Login</Link>
				</Button>
				<Button asChild variant='secondary'>
					<Link href={paths.register()}>Register</Link>
				</Button>
			</nav>
		</header>
	);
};

export default Header;
