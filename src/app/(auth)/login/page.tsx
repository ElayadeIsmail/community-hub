'use client';
import * as actions from '@/actions';
import { Spacer } from '@/components';
import { FromInput, SubmitButton } from '@/components/form';
import { useFormState } from 'react-dom';

const LoginPage = () => {
	const [formState, action] = useFormState(actions.login, {
		fieldErrors: {},
		formError: null,
	});
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
						<form
							action={action}
							autoComplete='off'
							className='space-y-4'>
							{formState.formError && (
								<span
									className='text-center bg-destructive rounded py-2 inline-block w-full text-destructive-foreground'
									role='alert'>
									{formState.formError}
								</span>
							)}
							<FromInput
								inputProps={{
									name: 'username',
									autoFocus: true,
									className: 'lowercase',
									placeholder: 'Username',
									autoComplete: 'off',
								}}
								labelProps={{
									children: 'username',
								}}
								errors={formState.fieldErrors.username}
							/>
							<FromInput
								inputProps={{
									name: 'password',
									type: 'password',
									placeholder: 'Password',
								}}
								labelProps={{
									children: 'password',
								}}
								errors={formState.fieldErrors.password}
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
