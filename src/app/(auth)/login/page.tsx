import { auth } from '@/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import LoginForm from '../components/LoginForm';
import { GithubProvider } from '../components/Providers';

const LoginPage = async () => {
	const session = await auth();
	if (session) {
		redirect('/');
	}
	return (
		<div className='flex min-h-full flex-col justify-center pt-20'>
			<div className='mx-auto w-full max-w-md'>
				<div className='flex flex-col gap-3 text-center'>
					<h1 className='text-h1 text-primary'>Welcome back!</h1>
					<p className='text-body-md text-muted-foreground'>
						Please enter your details.
					</p>
				</div>
				<div className='mx-auto space-y-4 w-full max-w-md px-8 mt-8'>
					<LoginForm />
					<hr />
					<GithubProvider />
					<div className='flex items-center justify-center gap-2 '>
						<span className='text-muted-foreground'>New here?</span>
						<Link href='/register'>Create an account</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
