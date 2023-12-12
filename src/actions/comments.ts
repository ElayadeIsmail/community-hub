'use server';

import { auth } from '@/auth';
import db from '@/db';
import paths from '@/lib/paths';
import { getErrorMessage } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

interface ICreateFromState {
	errors: {
		fieldErrors: {
			content?: string[];
		};
		formError?: string;
	};
	success?: boolean;
}

const createFormSchema = z.object({
	content: z.string().min(3),
});

export const createComment = async (
	{ postId, parentId }: { postId: string; parentId?: string },
	_: ICreateFromState,
	formData: FormData
): Promise<ICreateFromState> => {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}
	const content = formData.get('content');
	const result = createFormSchema.safeParse({ content });
	if (!result.success) {
		return {
			errors: {
				fieldErrors: result.error.flatten().fieldErrors,
			},
		};
	}

	try {
		await db.comment.create({
			data: {
				content: result.data.content,
				postId,
				parentId,
				userId: session.user.id,
			},
		});
	} catch (err) {
		return {
			errors: {
				fieldErrors: {},
				formError: getErrorMessage(err),
			},
		};
	}

	const community = await db.community.findFirst({
		where: { posts: { some: { id: postId } } },
	});
	if (!community) {
		return {
			errors: {
				fieldErrors: {},
				formError: 'Failed to revalidate',
			},
		};
	}

	revalidatePath(paths.showPost(community.slug, postId));
	return {
		errors: {
			fieldErrors: {},
		},
		success: true,
	};
};
