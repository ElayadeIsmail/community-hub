import { IPostsList } from '@/db/queries/posts';
import paths from '@/lib/paths';
import Link from 'next/link';
import PostActions from './post-actions';

interface Props {
	post: IPostsList[number];
}

const PostCard = ({ post }: Props) => {
	return (
		<div key={post.id} className='border rounded p-3 flex gap-3'>
			<PostActions
				points={post.points}
				postId={post.id}
				currentVote={post.votes[0]}
			/>
			<div>
				<Link href={paths.showCommunity(post.community.slug)}>
					<span className='text-xs font-bold'>
						c/{post.community.slug}
					</span>
				</Link>
				<Link href={paths.showPost(post.community.slug, post.id)}>
					<h3 className='text-lg font-bold line-clamp-1'>
						{post.title}
					</h3>
				</Link>
				<div className='flex flex-row gap-8'>
					<p className='text-xs text-gray-400'>
						By {post.author.name}
					</p>
					<p className='text-xs text-gray-400'>
						{post._count.comments} comments
					</p>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
