import { cn } from '@/utils/misc';
import { useId } from 'react';
import { Input, Label } from '../ui';

interface Props {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
	inputProps: React.InputHTMLAttributes<HTMLInputElement>;
	className?: string;
}

const FromInput = ({ inputProps, labelProps, className }: Props) => {
	const fallbackId = useId();
	const id = inputProps.id ?? fallbackId;
	return (
		<fieldset className={cn('relative', className)}>
			<Input
				id={id}
				{...inputProps}
				className='floating-input placeholder:text-transparent'
			/>
			<Label
				htmlFor={id}
				{...labelProps}
				className='absolute transition-all ml-2 top-4 font-semibold text-gray-500 capitalize left-3'
			/>
		</fieldset>
	);
};

export default FromInput;
