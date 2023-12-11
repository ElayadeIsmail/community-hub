'use server';

import { auth } from '@/auth';
import db from '@/db';
import paths from '@/lib/paths';
import { getErrorMessage } from '@/lib/utils';
import { Community } from '@prisma/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createCommunitySchema = z.object({
	slug: z
		.string({ required_error: 'Slug is required' })
		.min(3, { message: 'Slug is too short' })
		.max(20, { message: 'Slug is too long' })
		.regex(/^[a-zA-Z0-9_]+$/, {
			message: 'Slug can only include letters, numbers, and underscores',
		}),
	title: z
		.string({ required_error: 'title is required' })
		.min(3, { message: 'title is too short' })
		.max(100, { message: 'title is too long' }),
	description: z
		.string({ required_error: 'description is required' })
		.min(3, { message: 'description is too short' })
		.max(300, { message: 'description is too long' }),
});

interface CommunityFormState {
	fieldErrors: {
		slug?: string[];
		title?: string[];
		description?: string[];
	};
	formError: string | null;
}

export const createCommunity = async (
	_: CommunityFormState,
	formData: FormData
): Promise<CommunityFormState> => {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}
	const slug = formData.get('slug');
	const title = formData.get('title');
	const description = formData.get('description');
	const result = createCommunitySchema.safeParse({
		slug,
		title,
		description,
	});
	if (!result.success) {
		return {
			fieldErrors: result.error.flatten().fieldErrors,
			formError: null,
		};
	}
	let community: Community;
	try {
		const existing = await db.community.findUnique({
			where: {
				slug: result.data.slug,
			},
		});
		if (existing) {
			return {
				fieldErrors: {
					slug: ['Slug already exists'],
				},
				formError: null,
			};
		}
		community = await db.community.create({
			data: {
				...result.data,
				admin: {
					connect: {
						id: session.user.id,
					},
				},
			},
		});
	} catch (error) {
		return {
			fieldErrors: {},
			formError: getErrorMessage(error),
		};
	}
	redirect(paths.showCommunity(community.slug));
};
