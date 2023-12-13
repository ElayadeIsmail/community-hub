import db from '@/db';
import { delay } from '@/lib/utils';
import { notFound } from 'next/navigation';
import ReactMarkDown from 'react-markdown';

interface Props {
	postId: string;
}

const PostShow = async ({ postId }: Props) => {
	await delay();
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

			<div className='prose max-w-full text-foreground'>
				<ReactMarkDown>{post.content}</ReactMarkDown>
			</div>
		</div>
	);
};

export default PostShow;
