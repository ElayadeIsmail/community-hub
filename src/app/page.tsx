import PopularCommunities from '@/app/(base)/community/[slug]/components/popular-communities';
import { getPopularPosts } from '@/db/queries/posts';
import { Suspense } from 'react';
import PopularCommunitiesSkelton from './(base)/community/[slug]/components/popular-communities-skelton';
import { PostListSkeleton } from './(base)/community/[slug]/posts/components';
import PostList from './(base)/community/[slug]/posts/components/post-list';

export default function Home() {
	return (
		<section className='container grid grid-cols-4 gap-4 p-4'>
			<div className='lg:col-span-3 col-span-4'>
				<h1 className='lg:text-4xl text-2xl font-bold my-4'>
					Popular posts
				</h1>
				<Suspense fallback={<PostListSkeleton />}>
					<PostList fetcher={getPopularPosts} />
				</Suspense>
			</div>
			<div className='lg:block hidden'>
				<Suspense fallback={<PopularCommunitiesSkelton />}>
					<PopularCommunities />
				</Suspense>
			</div>
		</section>
	);
}
