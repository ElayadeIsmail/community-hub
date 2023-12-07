import * as actions from '@/actions';
import { Spacer } from '@/components';
import { FromInput, SubmitButton } from '@/components/form';

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

				<div>
					<div className='mx-auto w-full max-w-md px-8'>
						<form action={actions.login} className='space-y-4'>
							<FromInput
								inputProps={{
									name: 'username',
								}}
								labelProps={{
									children: 'Username',
								}}
							/>
							<FromInput
								inputProps={{
									name: 'password',
								}}
								labelProps={{
									children: 'password',
								}}
							/>
							<SubmitButton>Login</SubmitButton>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;

// #0f1a1c
// #D7DAdc
