import db from '@/db';
import { notFound } from 'next/navigation';
import ReactMarkDown from 'react-markdown';

interface Props {
	postId: string;
}

const PostShow = async ({ postId }: Props) => {
	const post = await db.post.findUnique({
		where: {
			id: postId,
		},
	});
	if (!post) {
		notFound();
	}
	return (
		<div className='mt-4'>
			<h1 className='text-2xl font-bold my-2 text-center'>
				{post.title}
			</h1>

			<div className='prose max-w-full'>
				<ReactMarkDown>{post.content}</ReactMarkDown>
			</div>
		</div>
	);
};

export default PostShow;
