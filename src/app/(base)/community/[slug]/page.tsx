import { Input } from '@/components/ui';
import paths from '@/lib/paths';
import Link from 'next/link';
import SlugCard from './components/slug-card';

interface Props {
	params: { slug: string };
}

const DisplayCommunityPage = ({ params }: Props) => {
	return (
		<section className='container grid grid-cols-4 gap-4 p-4'>
			<div className='col-span-3'>
				<Link href={paths.newPost(params.slug)}>
					<Input placeholder='New Post' />
				</Link>
			</div>
			<SlugCard slug={params.slug} />
		</section>
	);
};

export default DisplayCommunityPage;
