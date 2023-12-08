import { Spacer } from '@/components';
import { GithubProvider } from '../components/Providers';

const RegisterPage = () => {
	return (
		<div className='flex min-h-full flex-col justify-center pb-32 pt-20'>
			<div className='text-center'>
				<h1 className='text-h1 text-primary'>
					Let&apos;s start your journey!
				</h1>
				<p className='mt-3 text-body-md text-muted-foreground'>
					Please enter your details.
				</p>
			</div>
			<Spacer size='xs' />

			<div className='mx-auto w-full max-w-md px-8'>
				<GithubProvider />
			</div>
		</div>
	);
};

export default RegisterPage;
