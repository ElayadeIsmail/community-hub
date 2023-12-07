import { cn } from '@/utils/misc';
import { useId } from 'react';
import { FieldErrors } from '.';
import { Input, Label } from '../ui';

interface Props {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
	inputProps: React.InputHTMLAttributes<HTMLInputElement>;
	errors?: Array<string>;
	className?: string;
}

const FromInput = ({ inputProps, labelProps, className, errors }: Props) => {
	const fallbackId = useId();
	const id = inputProps.id ?? fallbackId;
	const errorId = errors?.length ? `${id}-error` : undefined;
	return (
		<fieldset className={cn('relative flex flex-col', className)}>
			<Input
				id={id}
				{...inputProps}
				className={cn(
					inputProps.className,
					'floating-input placeholder:text-transparent'
				)}
				aria-invalid={errorId ? true : undefined}
				aria-describedby={errorId}
			/>
			<Label
				htmlFor={id}
				{...labelProps}
				className={cn(
					labelProps.className,
					'absolute transition-all ml-2 top-4 font-semibold text-gray-500 capitalize left-3'
				)}
			/>
			<FieldErrors errors={errors} id={errorId} />
		</fieldset>
	);
};

export default FromInput;
