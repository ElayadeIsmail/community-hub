'use client';
import * as actions from '@/actions';
import { useSearchParams } from 'next/navigation';
import { Input } from './ui';

const SearchInput = () => {
	const searchParams = useSearchParams();
	return (
		<form action={actions.search}>
			<Input
				placeholder='Search'
				className='w-[300px]'
				name='term'
				defaultValue={searchParams.get('term') || ''}
			/>
		</form>
	);
};

export default SearchInput;
