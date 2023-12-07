import { cn } from '@/utils/misc';
import * as React from 'react';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-12 w-full rounded-full border border-input pt-2 bg-input px-4 font-semibold file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-input-invalid',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = 'Input';

export { Input };
