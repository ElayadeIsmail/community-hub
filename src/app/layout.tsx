import { Header } from '@/components';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';

const nunitoSans = Nunito_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'Community Hub',
	description: 'Find Interesting Communities',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={nunitoSans.className}>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	);
}
