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
export const getSearchPosts = async (searchTerm: string, cursor?: string) => {
	const session = await auth();

	const posts = await db.post.findMany({
		where: {
			OR: [
				{
					community: {
						slug: { contains: searchTerm, mode: 'insensitive' },
					},
				},
				{
					title: { contains: searchTerm, mode: 'insensitive' },
				},
				{
					content: {
						contains: searchTerm,
						mode: 'insensitive',
					},
				},
			],
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
