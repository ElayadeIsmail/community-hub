'use client';
import * as actions from '@/actions';
import { CheckboxField, FromInput, SubmitButton } from '@/components/form';
import { useFormState } from 'react-dom';

const RegisterFrom = () => {
	const [formState, action] = useFormState(actions.register, {
		fieldErrors: {},
		formError: null,
	});
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
				label='Name'
				name='name'
				autoFocus
				placeholder='Name'
				errors={formState.fieldErrors.name}
			/>
			<FromInput
				label='Email'
				name='email'
				className='lowercase'
				placeholder='email'
				autoComplete='off'
				errors={formState.fieldErrors.email}
			/>
			<FromInput
				label='Password'
				name='password'
				type='password'
				placeholder='************'
				errors={formState.fieldErrors.password}
			/>
			<FromInput
				label='Confirm Password'
				name='confirmPassword'
				type='password'
				placeholder='************'
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
			<SubmitButton size='full'>Register</SubmitButton>
		</form>
	);
};

export default RegisterFrom;
