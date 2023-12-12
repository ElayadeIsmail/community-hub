import { fetchCommentsByPostId } from '@/db/queries/comments';

interface Props {
	postId: string;
}

const CommentShow = async ({ postId }: Props) => {
	const comments = await fetchCommentsByPostId(postId);

	const topLevelComments = comments.filter(
		(_comment) => _comment.parentId === null
	);

	const renderedComments = topLevelComments.map((_comment) => {
		return <p key={_comment.id}>{_comment.content}</p>;
	});

	<div className='space-y-3'>
		<h1 className='text-lg font-bold'>All {comments.length} comments</h1>
		{renderedComments}
	</div>;
};

export default CommentShow;
