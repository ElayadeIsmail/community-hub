import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui';
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
		<Card className='mt-4'>
			<CardHeader>
				<CardDescription>Posted By Sam</CardDescription>
				<CardTitle>{post.title}</CardTitle>
			</CardHeader>

			<CardContent className='prose lg:prose-xl'>
				<ReactMarkDown>{post.content}</ReactMarkDown>
			</CardContent>
		</Card>
	);
};

export default PostShow;
