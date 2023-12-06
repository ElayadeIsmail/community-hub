import Link from 'next/link';
import { Button } from './ui';

const Header = () => {
	return (
		<header className='container flex items-center justify-between h-14 border-b'>
			<Link href={'/'} className='text-primary font-bold italic'>
				Community Hub
			</Link>
			<nav className='flex space-x-3'>
				<Link href='/login'>
					<Button>Login</Button>
				</Link>
				<Link href='/register'>
					<Button variant='secondary'>Register</Button>
				</Link>
			</nav>
		</header>
	);
};

export default Header;
