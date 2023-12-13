'use server';

import db from '@/db';
import { cache } from 'react';

export const getCommunityBySlug = cache(async (slug: string) => {
	return db.community.findUnique({
		where: {
			slug,
		},
		select: {
			title: true,
			description: true,
			createdAt: true,
			_count: {
				select: {
					posts: true,
					users: true,
				},
			},
		},
	});
});

export const getPopularCommunities = async () => {
	return db.community.findMany({
		orderBy: {
			posts: {
				_count: 'desc',
			},
		},
		take: 10,
	});
};
