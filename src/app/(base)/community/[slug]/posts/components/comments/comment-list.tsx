import { fetchCommentsByPostId } from '@/db/queries/comments';
import { delay } from '@/lib/utils';
import CommentShow from './comment-show';

interface Props {
	postId: string;
}

const CommentList = async ({ postId }: Props) => {
	await delay();
	const comments = await fetchCommentsByPostId(postId);

	const topLevelComments = comments.filter(
		(_comment) => _comment.parentId === null
	);

	const renderedComments = topLevelComments.map((_comment) => {
		return (
			<CommentShow
				commentId={_comment.id}
				postId={postId}
				key={_comment.id}
			/>
		);
	});

	return (
		<div className='space-y-3'>
			<h1 className='text-lg font-bold'>
				All {comments.length} comments
			</h1>
			{renderedComments}
		</div>
	);
};

export default CommentList;
