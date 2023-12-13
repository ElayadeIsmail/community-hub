import { Skeleton } from '@/components/ui';

const CommentListSkelton = () => {
	const renderedComments = Array.from({ length: 4 }).map((_, idx) => {
		return (
			<div
				key={`comment-skelton-${idx}`}
				className='p-4 border mt-2 mb-1'>
				<div className='flex items-center space-x-4'>
					<Skeleton className='h-12 w-12 rounded-full' />
					<div className='space-y-2'>
						<Skeleton className='h-4 w-[50px]' />
						<Skeleton className='h-4 w-[200px]' />
						<Skeleton className='h-4 w-[200px]' />
					</div>
				</div>
			</div>
		);
	});
	return <div className='space-y-3'>{renderedComments}</div>;
};

export default CommentListSkelton;
