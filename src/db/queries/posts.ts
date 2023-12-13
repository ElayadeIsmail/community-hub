'use server';

import { auth } from '@/auth';
import db from '@/db';

export type IPostsList = Awaited<ReturnType<typeof getPopularPosts>>;

export const getPopularPosts = async (cursor?: string) => {
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
		orderBy: {
			points: 'desc',
		},
	});
	return posts;
};
export const getPostsBySlug = async (slug: string) => {
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
		orderBy: {
			comments: {
				_count: 'desc',
			},
		},
	});
	return posts;
};
