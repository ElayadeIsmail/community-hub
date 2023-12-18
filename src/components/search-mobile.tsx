'use client';
import { SearchIcon } from 'lucide-react';
import SearchInput from './search-input';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './ui';

const SearchMobile = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<SearchIcon />
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className='text-sm mt-4 text-left'>
						Search for a community or a post
					</SheetTitle>
					<SheetDescription>
						<SearchInput />
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default SearchMobile;
