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
		<form action={action} autoComplete='off' className='space-y-4'>
			{formState.formError && (
				<span
					className='text-center bg-destructive rounded py-2 inline-block w-full text-destructive-foreground'
					role='alert'>
					{formState.formError}
				</span>
			)}
			<FromInput
				name='email'
				label='Email'
				autoFocus
				className='lowercase'
				placeholder='Email'
				autoComplete='off'
				type='email'
				errors={formState.fieldErrors.email}
			/>
			<FromInput
				label='Password'
				name='password'
				type='password'
				placeholder='************'
				errors={formState.fieldErrors.password}
			/>
			<SubmitButton size='full'>Login</SubmitButton>
		</form>
	);
};

export default LoginForm;
