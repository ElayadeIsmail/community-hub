'use server';

import { auth } from '@/auth';
import db from '@/db';
import paths from '@/lib/paths';
import { getErrorMessage } from '@/lib/utils';
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
			formError: getErrorMessage(error),
		};
	}
	redirect(paths.showPost(result.data.slug, post.id));
};

const voteSchema = z.object({
	postId: z.string(),
	vote: z.number().int().min(-1).max(1),
});

type VoteSchema = z.infer<typeof voteSchema>;

export const vote = async (body: VoteSchema) => {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}

	const result = voteSchema.safeParse(body);
	if (!result.success) {
		return { status: 'error', message: 'invalid body' } as const;
	}
	const existingVote = await db.vote.findUnique({
		where: {
			postId_userId: {
				postId: result.data.postId,
				userId: session.user.id,
			},
		},
	});

	if (!existingVote) {
		if (result.data.vote === 0) {
			return { status: 'error', message: 'invalid vote' } as const;
		}
		// create a new vote
		const post = await db.post.update({
			where: {
				id: result.data.postId,
			},
			select: {
				points: true,
			},
			data: {
				points: {
					increment: result.data.vote,
				},
				votes: {
					create: {
						userId: session.user.id,
						value: result.data.vote,
					},
				},
			},
		});

		return {
			status: 'success',
			data: { points: post.points, vote: result.data.vote },
		} as const;
	}
	if (result.data.vote === 1) {
		if (existingVote.value === 1) {
			return { status: 'error', message: 'invalid vote' } as const;
		} else {
			const post = await db.post.update({
				where: {
					id: result.data.postId,
				},
				data: {
					points: {
						increment: 2,
					},
					votes: {
						update: {
							where: {
								postId_userId: {
									postId: result.data.postId,
									userId: session.user.id,
								},
							},
							data: {
								value: 1,
							},
						},
					},
				},
			});
			return {
				status: 'success',
				data: { points: post.points, vote: result.data.vote },
			} as const;
		}
	} else if (result.data.vote === 0) {
		if (existingVote.value === 1) {
			const post = await db.post.update({
				where: {
					id: result.data.postId,
				},
				data: {
					points: {
						decrement: 1,
					},
					votes: {
						delete: {
							postId_userId: {
								postId: result.data.postId,
								userId: session.user.id,
							},
						},
					},
				},
			});
			return {
				status: 'success',
				data: { points: post.points, vote: result.data.vote },
			} as const;
		} else {
			const post = await db.post.update({
				where: {
					id: result.data.postId,
				},
				data: {
					points: {
						increment: 1,
					},
					votes: {
						delete: {
							postId_userId: {
								postId: result.data.postId,
								userId: session.user.id,
							},
						},
					},
				},
			});
			return {
				status: 'success',
				data: { points: post.points, vote: result.data.vote },
			} as const;
		}
	} else {
		if (existingVote.value === 1) {
			const post = await db.post.update({
				where: {
					id: result.data.postId,
				},
				data: {
					points: {
						decrement: 2,
					},
					votes: {
						update: {
							where: {
								postId_userId: {
									postId: result.data.postId,
									userId: session.user.id,
								},
							},
							data: {
								value: -1,
							},
						},
					},
				},
			});
			return {
				status: 'success',
				data: { points: post.points, vote: result.data.vote },
			} as const;
		} else {
			return { status: 'error', message: 'invalid vote' } as const;
		}
	}
};
