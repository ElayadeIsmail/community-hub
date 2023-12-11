import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

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
	return 'Something Went Wrong';
}

export const getInitialsFromName = (name: string): string => {
	const sts = name.split(' ');
	return `${sts[0][0]} ${sts[sts.length - 1][0]}`;
};

export const formatNumber = (value: number): string => {
	if (value < 1000) {
		return value.toString();
	} else if (value < 1000000) {
		// Display as k (thousands) with one decimal place
		return (value / 1000).toFixed(1) + 'k';
	} else if (value < 1000000000) {
		// Display as m (millions) with one decimal place
		return (value / 1000000).toFixed(1) + 'm';
	} else {
		// Display as b (billions) with one decimal place
		return (value / 1000000000).toFixed(1) + 'b';
	}
};

export const formateDate = (d: Date) => {
	return dayjs(d).format('MMM DD, YYYY');
};

export const delay = (ms = 2000) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, ms);
	});
};
