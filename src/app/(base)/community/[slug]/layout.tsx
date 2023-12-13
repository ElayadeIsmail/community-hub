import React, { Suspense } from 'react';
import SlugCard from './components/slug-card';
import SlugCardSkelton from './components/slug-card-skelton';

interface Props {
	children: React.ReactNode;
	params: { slug: string };
}

const CommunityLayout = ({ children, params }: Props) => {
	return (
		<section className='container grid grid-cols-4 gap-4 p-4'>
			<div className='col-span-3 space-y-2'>{children}</div>
			<Suspense fallback={<SlugCardSkelton />}>
				<SlugCard slug={params.slug} />
			</Suspense>
		</section>
	);
};

export default CommunityLayout;
