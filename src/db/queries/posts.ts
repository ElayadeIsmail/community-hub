'use server';

import { auth } from '@/auth';
import db from '@/db';

export type IHomePopularPosts = Awaited<ReturnType<typeof getPopularPosts>>;

export const getPopularPosts = async () => {
	const session = await auth();
	if (session) {
	}
	const posts = await db.post.findMany({
		select: {
			content: true,
			createdAt: true,
			title: true,
			points: true,
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
