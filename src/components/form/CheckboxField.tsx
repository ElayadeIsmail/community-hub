import { CheckboxProps } from '@radix-ui/react-checkbox';
import { useId, useRef } from 'react';
import { FieldErrors } from '.';
import { Checkbox } from '../ui';

function CheckboxField({
	labelProps,
	buttonProps,
	errors,
	className,
}: {
	labelProps: JSX.IntrinsicElements['label'];
	buttonProps: CheckboxProps;
	errors?: string[];
	className?: string;
}) {
	const fallbackId = useId();
	const buttonRef = useRef<HTMLButtonElement>(null);
	// To emulate native events that Conform listen to:
	// See https://conform.guide/integrations
	// const control = useInputEvent({
	// 	// Retrieve the checkbox element by name instead as Radix does not expose the internal checkbox element
	// 	// See https://github.com/radix-ui/primitives/discussions/874
	// 	ref: () =>
	// 		buttonRef.current?.form?.elements.namedItem(buttonProps.name ?? ''),
	// 	onFocus: () => buttonRef.current?.focus(),
	// })
	const id = buttonProps.id ?? buttonProps.name ?? fallbackId;
	const errorId = errors?.length ? `${id}-error` : undefined;
	return (
		<div className={className}>
			<div className='flex gap-2'>
				<Checkbox
					id={id}
					ref={buttonRef}
					aria-invalid={errorId ? true : undefined}
					aria-describedby={errorId}
					{...buttonProps}
					type='button'
				/>
				<label
					htmlFor={id}
					{...labelProps}
					className='self-center text-body-xs text-muted-foreground'
				/>
			</div>
			<FieldErrors id={errorId} errors={errors} />
		</div>
	);
}

export default CheckboxField;
