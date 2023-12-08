import { Header } from '@/components';
import Providers from '@/components/Providers';
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
		<html lang='en' suppressHydrationWarning>
			<body className={nunitoSans.className}>
				<Providers>
					<Header />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
