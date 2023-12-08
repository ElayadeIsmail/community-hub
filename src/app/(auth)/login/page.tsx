import { Spacer } from '@/components';
import { GithubProvider } from '../components/Providers';

const LoginPage = () => {
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
				<div className='mx-auto w-full max-w-md px-8'>
					<GithubProvider />
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
