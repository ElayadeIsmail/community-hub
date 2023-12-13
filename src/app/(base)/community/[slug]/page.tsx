import { Input } from '@/components/ui';
import db from '@/db';
import { getPostsBySlug } from '@/db/queries/posts';
import paths from '@/lib/paths';
import Link from 'next/link';
import { Suspense } from 'react';
import { PostListSkeleton } from './posts/components';
import PostList from './posts/components/post-list';

import type { Metadata } from 'next';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	// read route params
	const slug = params.slug;
	const community = await db.community.findUnique({
		where: {
			slug,
		},
	});

	return {
		title: community?.title,
		description: community?.description,
	};
}

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
