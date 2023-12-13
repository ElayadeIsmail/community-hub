import paths from '@/lib/paths';
import Link from 'next/link';
import { Suspense } from 'react';
import { PostShowSkelton } from '../components';
import {
	CommentList,
	CommentListSkelton,
	CreateCommentForm,
} from '../components/comments';
import PostShow from '../components/post-show';

interface Props {
	params: {
		slug: string;
		postId: string;
	};
}

const ShowPostPage = ({ params: { postId, slug } }: Props) => {
	return (
		<>
			<Link
				className='underline decoration-solid'
				href={paths.showCommunity(slug)}>
				{'< '}Back to {slug}
			</Link>
			<Suspense fallback={<PostShowSkelton />}>
				<PostShow postId={postId} />
			</Suspense>
			<CreateCommentForm postId={postId} startOpen />
			<Suspense fallback={<CommentListSkelton />}>
				<CommentList postId={postId} />
			</Suspense>
		</>
	);
};

export default ShowPostPage;
