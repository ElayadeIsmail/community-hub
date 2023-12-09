import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function getErrorMessage(error: unknown) {
	if (typeof error === 'string') return error;
	if (
		error &&
		typeof error === 'object' &&
		'message' in error &&
		typeof error.message === 'string'
	) {
		return error.message;
	}
	console.error('Unable to get error message for error', error);
	return 'Unknown Error';
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getInitialsFromName = (name: string): string => {
	const sts = name.split(' ');
	return `${sts[0][0]} ${sts[sts.length - 1][0]}`;
};
