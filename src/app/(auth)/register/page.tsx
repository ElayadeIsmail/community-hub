'use client';
import * as actions from '@/actions';
import { Spacer } from '@/components';
import { CheckboxField, FromInput, SubmitButton } from '@/components/form';
import { useFormState } from 'react-dom';

const RegisterPage = () => {
	const [formState, action] = useFormState(actions.register, {
		fieldErrors: {},
		formError: null,
	});
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
								name: 'email',
								className: 'lowercase',
								placeholder: 'email',
								autoComplete: 'off',
							}}
							labelProps={{
								children: 'email',
							}}
							errors={formState.fieldErrors.email}
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
						<FromInput
							inputProps={{
								name: 'confirmPassword',
								type: 'password',
								placeholder: 'confirm Password',
							}}
							labelProps={{
								children: 'Confirm Password',
							}}
							errors={formState.fieldErrors.confirmPassword}
						/>
						<CheckboxField
							labelProps={{
								htmlFor:
									'agreeToTermsOfServiceAndPrivacyPolicy',
								children:
									'Do you agree to our Terms of Service and Privacy Policy?',
							}}
							buttonProps={{
								name: 'agreeToTermsOfServiceAndPrivacyPolicy',
							}}
							errors={
								formState.fieldErrors
									.agreeToTermsOfServiceAndPrivacyPolicy
							}
						/>
						<SubmitButton>Login</SubmitButton>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
