import { Skeleton } from '@/components/ui';

const PostShowSkelton = () => {
	const renderedContent = Array.from({ length: 8 }).map((_, idx) => {
		return <Skeleton className='w-full h-5' key={`show-post-${idx}`} />;
	});
	return (
		<div className='mt-4'>
			<h1 className='text-2xl font-bold my-2 text-center'>
				<Skeleton className='w-48 mx-auto h-5' />
			</h1>

			<div className='space-y-3'>{renderedContent}</div>
		</div>
	);
};

export default PostShowSkelton;
