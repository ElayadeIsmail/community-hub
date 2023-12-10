'use server';

import { auth } from '@/auth';
import db from '@/db';
import { Post } from '@prisma/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createPostSchema = z.object({
	title: z
		.string({ required_error: 'title is required' })
		.min(3, { message: 'title is too short' })
		.max(150, { message: 'title is too long' }),
	slug: z
		.string({ required_error: 'slug is required' })
		.min(3, { message: 'slug is too short' }),
	content: z
		.string({ required_error: 'content is required' })
		.min(3, { message: 'content is too short' }),
});

interface CommunityFormState {
	fieldErrors: {
		title?: string[];
		slug?: string[];
		content?: string[];
	};
	formError: string | null;
}

export const createPost = async (
	props: { slug: string; content: string },
	_: CommunityFormState,
	formData: FormData
): Promise<CommunityFormState> => {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}
	const title = formData.get('title');
	const result = createPostSchema.safeParse({ ...props, title });
	if (!result.success) {
		return {
			fieldErrors: result.error.flatten().fieldErrors,
			formError: null,
		};
	}
	let post: Post;
	try {
		const community = await db.community.findUnique({
			where: {
				slug: result.data.slug,
			},
		});
		if (!community) {
			return {
				fieldErrors: {},
				formError: 'community not found',
			};
		}
		post = await db.post.create({
			data: {
				title: result.data.title,
				content: result.data.content,
				authorId: session.user.id,
				communityId: community.id,
			},
		});
	} catch (error) {
		return {
			fieldErrors: {},
			formError: 'Something Went wrong',
		};
	}
	redirect(`/community/${result.data.slug}/posts/${post.id}`);
};
