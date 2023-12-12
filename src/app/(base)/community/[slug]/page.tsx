import { Input } from '@/components/ui';
import { getPostsBySlug } from '@/db/queries/posts';
import paths from '@/lib/paths';
import Link from 'next/link';
import PostList from './posts/components/post-list';

interface Props {
	params: { slug: string };
}

const DisplayCommunityPage = ({ params: { slug } }: Props) => {
	return (
		<>
			<Link href={paths.newPost(slug)}>
				<Input placeholder='New Post' />
			</Link>
			<PostList fetcher={() => getPostsBySlug(slug)} />
		</>
	);
};

export default DisplayCommunityPage;
