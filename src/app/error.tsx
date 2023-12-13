'use client';
import Link from 'next/link';

const ErrorPage = () => {
	return (
		<div className='w-full container h-[calc(100vh-70px)] flex flex-col items-center justify-center'>
			<h1 className='text-h1'>Sorry Something Went Wrong</h1>
			<Link className='underline ' href='/'>
				Go Home
			</Link>
		</div>
	);
};

export default ErrorPage;
