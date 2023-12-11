import PopularCommunities from '@/app/(base)/community/[slug]/components/popular-communities';
import { getPopularPosts } from '@/db/queries/posts';
import { Suspense } from 'react';
import PostList from './(base)/community/[slug]/posts/components/post-list';

export default function Home() {
	return (
		<section className='container grid grid-cols-4 gap-4 p-4'>
			<div className='col-span-3 '>
				<h1 className='text-4xl font-bold my-4'>Popular posts</h1>
				<Suspense fallback={<p>Loading...</p>}>
					<PostList fetcher={getPopularPosts} />
				</Suspense>
			</div>
			<Suspense>
				<PopularCommunities />
			</Suspense>
		</section>
	);
}
