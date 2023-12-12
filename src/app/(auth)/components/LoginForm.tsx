'use client';
import * as actions from '@/actions';
import { FromInput, SubmitButton } from '@/components/form';
import { useFormState } from 'react-dom';

const LoginForm = () => {
	const [formState, action] = useFormState(
		actions.login.bind(null, 'credentials'),
		{
			fieldErrors: {},
			formError: null,
		}
	);
	return (
		<div className='mx-auto w-full max-w-md px-8'>
			<form action={action} autoComplete='off' className='space-y-4'>
				{formState.formError && (
					<span
						className='text-center bg-destructive rounded py-2 inline-block w-full text-destructive-foreground'
						role='alert'>
						{formState.formError}
					</span>
				)}
				<FromInput
					{...{
						name: 'email',
						autoFocus: true,
						className: 'lowercase',
						placeholder: 'Email',
						autoComplete: 'off',
						type: 'email',
					}}
					errors={formState.fieldErrors.email}
				/>
				<FromInput
					{...{
						name: 'password',
						type: 'password',
						placeholder: 'Password',
					}}
					errors={formState.fieldErrors.password}
				/>
				<SubmitButton>Login</SubmitButton>
			</form>
		</div>
	);
};

export default LoginForm;
