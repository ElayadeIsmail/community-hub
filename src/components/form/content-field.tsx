import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useId } from 'react';
import { SimpleMDEReactProps } from 'react-simplemde-editor';
import { Label } from '../ui';
import FieldErrors from './field-errrors';
const SimpleMDE = dynamic(() => import('../simpleMDE'), { ssr: false });

interface Props extends SimpleMDEReactProps {
	label?: string;
	errors?: string[];
}

const ContentField = ({ label, errors, ...props }: Props) => {
	const fallbackId = useId();
	const id = props.id ?? fallbackId;
	const errorId = errors?.length ? `${id}-error` : undefined;
	return (
		<fieldset className={cn('flex flex-col space-y-1')}>
			{label && <Label htmlFor={id}>{label}</Label>}
			<SimpleMDE
				id={id}
				aria-invalid={errorId ? true : undefined}
				aria-describedby={errorId}
				{...props}
			/>

			<FieldErrors errors={errors} id={errorId} />
		</fieldset>
	);
};

export default ContentField;
