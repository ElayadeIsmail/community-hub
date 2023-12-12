import { Input } from '@/components/ui';
import { getPostsBySlug } from '@/db/queries/posts';
import paths from '@/lib/paths';
import Link from 'next/link';
import SlugCard from './components/slug-card';
import PostList from './posts/components/post-list';

interface Props {
	params: { slug: string };
}

const DisplayCommunityPage = ({ params: { slug } }: Props) => {
	return (
		<section className='container grid grid-cols-4 gap-4 p-4'>
			<div className='col-span-3 space-y-2'>
				<Link href={paths.newPost(slug)}>
					<Input placeholder='New Post' />
				</Link>
				<PostList fetcher={() => getPostsBySlug(slug)} />
			</div>
			<SlugCard slug={slug} />
		</section>
	);
};

export default DisplayCommunityPage;
