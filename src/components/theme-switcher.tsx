'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui';

const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme();
	const Icon = theme === 'light' ? <Moon /> : <Sun />;
	return (
		<Button
			onClick={() => {
				const newTheme = theme === 'light' ? 'dark' : 'light';
				setTheme(newTheme);
			}}
			variant='ghost'>
			{Icon}
		</Button>
	);
};

export default ThemeSwitcher;
