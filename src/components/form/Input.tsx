import { cn } from '@/lib/utils';
import { useId } from 'react';
import { FieldErrors } from '.';
import { Input, Label, Textarea } from '../ui';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	errors?: Array<string>;
}

export const FromInput = ({ className, errors, ...inputProps }: Props) => {
	const fallbackId = useId();
	const id = inputProps.id ?? fallbackId;
	const errorId = errors?.length ? `${id}-error` : undefined;
	return (
		<fieldset className='flex flex-col space-y-1'>
			<Label htmlFor='email'>Email</Label>
			<Input type='email' id='email' placeholder='Email' />
			<FieldErrors errors={errors} id={errorId} />
		</fieldset>
	);
};

interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	errors?: Array<string>;
}

export const TextAreaInput = ({
	className,
	errors,
	...props
}: TextAreaProps) => {
	const fallbackId = useId();
	const id = props.id ?? fallbackId;
	const errorId = errors?.length ? `${id}-error` : undefined;
	return (
		<fieldset className={cn('flex flex-col space-y-1')}>
			<Label htmlFor='email'>Email</Label>
			<Textarea
				id={id}
				{...props}
				aria-invalid={errorId ? true : undefined}
				aria-describedby={errorId}
			/>
			<FieldErrors errors={errors} id={errorId} />
		</fieldset>
	);
};
