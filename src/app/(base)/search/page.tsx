import { getSearchPosts } from '@/db/queries/posts';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import {
	PostList,
	PostListSkeleton,
} from '../community/[slug]/posts/components';

interface SearchPageProps {
	searchParams: {
		term: string;
	};
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
	if (!searchParams.term) {
		redirect('/');
	}
	return (
		<section className='container grid grid-cols-4 gap-4 p-4'>
			<div className='col-span-3 '>
				<h1 className='text-4xl font-bold my-4'>
					Search Result For &quot;{searchParams.term}&quot;
				</h1>
				<Suspense fallback={<PostListSkeleton />}>
					<PostList
						fetcher={async (cursor?: string) => {
							'use server';
							return getSearchPosts(searchParams.term, cursor);
						}}
					/>
				</Suspense>
			</div>
		</section>
	);
};

export default SearchPage;
