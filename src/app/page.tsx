import PopularCommunities from '@/app/(base)/community/[slug]/components/popular-communities';

export default function Home() {
	return (
		<section className='container grid grid-cols-4 gap-4 p-4'>
			<div className='col-span-3 '>
				<h1 className='text-xl m-2'>Popular posts</h1>
			</div>
			<PopularCommunities />
		</section>
	);
}
