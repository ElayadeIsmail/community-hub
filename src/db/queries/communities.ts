'use server';

import db from '@/db';
import { delay } from '@/lib/utils';
import { cache } from 'react';

export const getCommunityBySlug = cache(async (slug: string) => {
	await delay();
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
	await delay();
	return db.community.findMany({
		orderBy: {
			posts: {
				_count: 'desc',
			},
		},
		take: 10,
	});
};
