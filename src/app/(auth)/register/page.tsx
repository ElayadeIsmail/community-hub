import { auth } from '@/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { GithubProvider } from '../components/Providers';
import RegisterFrom from '../components/RegisterFrom';

const RegisterPage = async () => {
	const session = await auth();
	if (session) {
		redirect('/');
	}
	return (
		<div className='flex min-h-full flex-col justify-center pt-20'>
			<div className='text-center'>
				<h1 className='text-h1 text-primary'>
					Let&apos;s start your journey!
				</h1>
				<p className='mt-3 text-body-md text-muted-foreground'>
					Please enter your details.
				</p>
			</div>

			<div className='mx-auto space-y-4 o w-full max-w-md px-8 mt-8'>
				<RegisterFrom />
				<hr />
				<GithubProvider />
				<div className='flex items-center justify-center gap-2 '>
					<span className='text-muted-foreground'>
						Already have an account?
					</span>
					<Link href='/login'>Sign In</Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
