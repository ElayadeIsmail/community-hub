import { Input } from '@/components/ui';
import { getPostsBySlug } from '@/db/queries/posts';
import paths from '@/lib/paths';
import Link from 'next/link';
import { Suspense } from 'react';
import { PostListSkeleton } from './posts/components';
import PostList from './posts/components/post-list';

interface Props {
	params: { slug: string };
}

const DisplayCommunityPage = ({ params: { slug } }: Props) => {
	return (
		<>
			<Link href={paths.newPost(slug)}>
				<Input placeholder='New Post' />
			</Link>
			<Suspense fallback={<PostListSkeleton />}>
				<PostList
					fetcher={async (curser?: string) => {
						'use server';
						return getPostsBySlug(slug, curser);
					}}
				/>
			</Suspense>
		</>
	);
};

export default DisplayCommunityPage;
