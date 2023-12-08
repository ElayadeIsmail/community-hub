'use client';
import { cn } from '@/utils/misc';
import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '../ui';

const Spinner = ({ className = '' }: { className?: string }) => {
	return (
		<div
			className={cn(
				'inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
				className
			)}
			role='status'>
			<span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
				Loading...
			</span>
		</div>
	);
};

const SubmitButton = (props: ButtonProps) => {
	const { pending } = useFormStatus();

	return (
		<Button
			disabled={pending}
			className='h-12 w-full text-base'
			type='submit'
			{...props}>
			{props.children}
			{pending && <Spinner className='ml-2' />}
		</Button>
	);
};

export default SubmitButton;
