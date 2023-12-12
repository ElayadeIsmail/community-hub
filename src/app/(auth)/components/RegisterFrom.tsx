'use client';
import * as actions from '@/actions';
import { CheckboxField, FromInput, SubmitButton } from '@/components/form';
import { useFormState } from 'react-dom';
import { GithubProvider } from './Providers';

const RegisterFrom = () => {
	const [formState, action] = useFormState(actions.register, {
		fieldErrors: {},
		formError: null,
	});
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
						name: 'name',
						autoFocus: true,
						placeholder: 'Name',
					}}
					errors={formState.fieldErrors.name}
				/>
				<FromInput
					{...{
						name: 'email',
						className: 'lowercase',
						placeholder: 'email',
						autoComplete: 'off',
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
				<FromInput
					{...{
						name: 'confirmPassword',
						type: 'password',
						placeholder: 'confirm Password',
					}}
					errors={formState.fieldErrors.confirmPassword}
				/>
				<CheckboxField
					labelProps={{
						htmlFor: 'term',
						children:
							'Do you agree to our Terms of Service and Privacy Policy?',
					}}
					buttonProps={{
						name: 'term',
					}}
					errors={formState.fieldErrors.term}
				/>
				<SubmitButton>Register</SubmitButton>
			</form>
			<GithubProvider />
		</div>
	);
};

export default RegisterFrom;
