import { IPostsList } from '@/db/queries/posts';
import InfinitePosts from './infinite-posts';

interface Props {
	fetcher: (curser?: string) => Promise<IPostsList>;
}

const PostList = async ({ fetcher }: Props) => {
	const posts = await fetcher();

	return <InfinitePosts initialPosts={posts} fetcher={fetcher} />;
};

export default PostList;
