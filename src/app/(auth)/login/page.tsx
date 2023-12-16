import { auth } from '@/auth';
import { Spacer } from '@/components';
import { redirect } from 'next/navigation';
import LoginForm from '../components/LoginForm';
import { GithubProvider } from '../components/Providers';

const LoginPage = async () => {
	const session = await auth();
	if (session) {
		redirect('/');
	}
	return (
		<div className='flex min-h-full flex-col justify-center pb-32 pt-20'>
			<div className='mx-auto w-full max-w-md'>
				<div className='flex flex-col gap-3 text-center'>
					<h1 className='text-h1 text-primary'>Welcome back!</h1>
					<p className='text-body-md text-muted-foreground'>
						Please enter your details.
					</p>
				</div>
				<Spacer size='xs' />
				<div className='mx-auto space-y-4 w-full max-w-md px-8'>
					<LoginForm />
					<hr />
					<GithubProvider />
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
