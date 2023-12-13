import { Skeleton } from '@/components/ui';

const PostSkeleton = () => {
	return (
		<div className='flex flex-col space-y-2 border rounded py-3 px-8'>
			<Skeleton className='w-[80px] h-4' />
			<Skeleton className='w-[80%] h-4' />
			<div className='flex space-x-4'>
				<Skeleton className='w-[100px] h-4' />
				<Skeleton className='w-[60px] h-4' />
			</div>
		</div>
	);
};

export default PostSkeleton;
