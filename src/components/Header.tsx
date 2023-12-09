import paths from '@/lib/paths';
import Link from 'next/link';
import HeaderAuth from './HeaderAuth';

const Header = () => {
	return (
		<header className='container flex items-center justify-between h-14 border-b'>
			<Link href={paths.home()} className='text-primary font-bold italic'>
				Community Hub
			</Link>
			<nav className='flex space-x-3'>
				<HeaderAuth />
			</nav>
		</header>
	);
};

export default Header;
