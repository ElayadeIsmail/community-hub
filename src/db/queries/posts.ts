'use server';

import { auth } from '@/auth';
import db from '@/db';
import { delay } from '@/lib/utils';

export type IPostsList = Awaited<ReturnType<typeof getPopularPosts>>;

export const getPopularPosts = async (cursor?: string) => {
	await delay();
	const session = await auth();

	const posts = await db.post.findMany({
		select: {
			id: true,
			createdAt: true,
			title: true,
			points: true,
			community: {
				select: {
					slug: true,
				},
			},
			author: {
				select: {
					name: true,
					image: true,
				},
			},
			_count: {
				select: {
					comments: true,
				},
			},
			votes: session
				? {
						where: {
							userId: session.user.id,
						},
						select: {
							value: true,
						},
				  }
				: undefined,
		},
		cursor: typeof cursor === 'string' ? { id: cursor } : undefined,
		skip: typeof cursor === 'string' ? 1 : 0,
		take: 20,
		orderBy: {
			points: 'desc',
		},
	});
	return posts;
};
export const getPostsBySlug = async (slug: string, cursor?: string) => {
	await delay();
	const session = await auth();

	const posts = await db.post.findMany({
		where: {
			community: {
				slug,
			},
		},
		select: {
			id: true,
			createdAt: true,
			title: true,
			points: true,
			community: {
				select: {
					slug: true,
				},
			},
			author: {
				select: {
					name: true,
					image: true,
				},
			},
			_count: {
				select: {
					comments: true,
				},
			},
			votes: session
				? {
						where: {
							userId: session.user.id,
						},
						select: {
							value: true,
						},
				  }
				: undefined,
		},
		cursor: typeof cursor === 'string' ? { id: cursor } : undefined,
		skip: typeof cursor === 'string' ? 1 : 0,
		take: 20,
		orderBy: {
			points: 'desc',
		},
	});
	return posts;
};
