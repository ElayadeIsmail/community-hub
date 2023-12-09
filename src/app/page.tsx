import CreateCommunityForm from '@/components/communities/CreateCommunityForm';

export default function Home() {
	return (
		<section className='container grid grid-cols-4 gap-4 p-4'>
			<div className='col-span-3 '>
				<h1 className='text-xl m-2'>Popular posts</h1>
			</div>
			<div className='border shadow rounded py-3 px-4 '>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg'>Popular Communities</h3>
					<CreateCommunityForm />
				</div>
			</div>
		</section>
	);
}
