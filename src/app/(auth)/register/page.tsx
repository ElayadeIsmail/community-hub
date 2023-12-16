import { auth } from '@/auth';
import { Spacer } from '@/components';
import { redirect } from 'next/navigation';
import { GithubProvider } from '../components/Providers';
import RegisterFrom from '../components/RegisterFrom';

const RegisterPage = async () => {
	const session = await auth();
	if (session) {
		redirect('/');
	}
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

			<div className='mx-auto space-y-4 o w-full max-w-md px-8'>
				<RegisterFrom />
				<hr />
				<GithubProvider />
			</div>
		</div>
	);
};

export default RegisterPage;
