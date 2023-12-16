import paths from '@/lib/paths';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';
import HeaderAuth from './header-auth';
import SearchInput from './search-input';
const ThemeSwitcher = dynamic(() => import('./theme-switcher'), { ssr: false });

const Header = () => {
	return (
		<header className='container flex items-center justify-between h-14 border-b'>
			<Link href={paths.home()} className='text-primary font-bold italic'>
				Community Hub
			</Link>
			<Suspense>
				<SearchInput />
			</Suspense>
			<nav className='flex space-x-3'>
				<Suspense fallback={<div className='h-11 w-[120px] border' />}>
					<HeaderAuth />
				</Suspense>
				<ThemeSwitcher />
			</nav>
		</header>
	);
};

export default Header;