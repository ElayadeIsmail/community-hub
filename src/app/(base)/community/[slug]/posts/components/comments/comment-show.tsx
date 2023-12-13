import { fetchCommentsByPostId } from '@/db/queries/comments';
import { AvatarPlaceholder } from '@/lib/constants';
import Image from 'next/image';
import CommentCreateForm from './comment-create-form';

interface Props {
	postId: string;
	commentId: string;
}

const CommentShow = async ({ postId, commentId }: Props) => {
	const comments = await fetchCommentsByPostId(postId);

	const comment = comments.find((_comment) => _comment.id === commentId);

	if (!comment) return null;

	const childrenComments = comments.filter(
		(_comment) => _comment.parentId === comment.id
	);

	const renderedChildren = childrenComments.map((_comment) => {
		return (
			<CommentShow
				key={_comment.id}
				commentId={_comment.id}
				postId={_comment.postId}
			/>
		);
	});

	return (
		<div className='p-4 border mt-2 mb-1'>
			<div className='flex gap-3'>
				<Image
					src={comment.user.image || AvatarPlaceholder}
					alt='user image'
					width={40}
					height={40}
					className='w-10 h-10 rounded-full'
				/>
				<div className='flex-1 space-y-3'>
					<p className='text-sm font-medium text-muted-foreground'>
						{comment.user.name}
					</p>
					<p className='text-accent-foreground'>{comment.content}</p>

					<CommentCreateForm
						postId={comment.postId}
						parentId={comment.id}
					/>
				</div>
			</div>
			<div className='pl-4'>{renderedChildren}</div>
		</div>
	);
};

export default CommentShow;
