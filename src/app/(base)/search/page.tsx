import { redirect } from 'next/navigation';

interface SearchPageProps {
	searchParams: {
		term: string;
	};
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
	if (!searchParams.term) {
		redirect('/');
	}
	return <div>page</div>;
};

export default SearchPage;
