import { Input } from '@/components/ui';
import Link from 'next/link';
import SlugCard from './components/slug-card';

interface Props {
	params: { slug: string };
}

const DisplayCommunityPage = ({ params }: Props) => {
	return (
		<section className='container grid grid-cols-4 gap-4 p-4'>
			<div className='col-span-3'>
				<Link href={`/community/${params.slug}/posts/new`}>
					<Input placeholder='New Post' />
				</Link>
			</div>
			<SlugCard slug={params.slug} />
		</section>
	);
};

export default DisplayCommunityPage;
