import React from 'react';
import SlugCard from './components/slug-card';

interface Props {
	children: React.ReactNode;
	params: { slug: string };
}

const CommunityLayout = ({ children, params }: Props) => {
	return (
		<section className='container grid grid-cols-4 gap-4 p-4'>
			<div className='col-span-3 space-y-2'>{children}</div>
			<SlugCard slug={params.slug} />
		</section>
	);
};

export default CommunityLayout;
