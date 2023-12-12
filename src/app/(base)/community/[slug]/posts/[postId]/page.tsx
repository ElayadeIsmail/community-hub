import paths from '@/lib/paths';
import Link from 'next/link';
import { Suspense } from 'react';
import PostShow from '../components/post-show';

interface Props {
	params: {
		slug: string;
		postId: string;
	};
}

const ShowPostPage = ({ params: { postId, slug } }: Props) => {
	return (
		<section className='container grid grid-cols-4 gap-4 p-4'>
			<div className='col-span-3 '>
				<Link
					className='underline decoration-solid'
					href={paths.showCommunity(slug)}>
					{'< '}Back to {slug}
				</Link>
				<Suspense fallback={<>Loading...</>}>
					<PostShow postId={postId} />
				</Suspense>
			</div>
		</section>
	);
};

export default ShowPostPage;
