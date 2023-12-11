import { IPostsList } from '@/db/queries/posts';
import paths from '@/lib/paths';
import Link from 'next/link';
import PostActions from './post-actions';

interface Props {
	fetcher: () => Promise<IPostsList>;
}

const PostList = async ({ fetcher }: Props) => {
	const posts = await fetcher();
	const renderedPosts = posts.map((_post) => {
		return (
			<div key={_post.id} className='border rounded p-3 flex gap-3'>
				<PostActions />
				<div>
					<Link href={paths.showCommunity(_post.community.slug)}>
						<span className='text-xs font-bold'>
							c/{_post.community.slug}
						</span>
					</Link>
					<Link
						className={paths.showPost(
							_post.community.slug,
							_post.id
						)}
						href={''}>
						<h3 className='text-lg font-bold line-clamp-1'>
							{_post.title}
						</h3>
					</Link>
					<div className='flex flex-row gap-8'>
						<p className='text-xs text-gray-400'>
							By {_post.author.name}
						</p>
						<p className='text-xs text-gray-400'>
							{_post._count.comments} comments
						</p>
					</div>
				</div>
			</div>
		);
	});
	return <div className='flex flex-col'>{renderedPosts}</div>;
};

export default PostList;
