import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Skeleton,
} from '@/components/ui';

const SlugCardSkelton = () => {
	return (
		<Card className='sticky top-4 h-fit'>
			<CardHeader>
				<CardTitle>
					<Skeleton className='w-48 h-4' />
				</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription className='space-y-3'>
					<Skeleton className='w-full h-4' />
					<Skeleton className='w-full h-4' />
					<Skeleton className='w-full h-4' />
				</CardDescription>
			</CardContent>
			<CardFooter className='flex items-center text-sm text-center justify-between'>
				<span className='flex flex-col space-y-2'>
					<Skeleton className='w-24 h-4' />
					<Skeleton className='w-14 h-4' />
				</span>
				<span className='flex flex-col space-y-2'>
					<Skeleton className='w-24 h-4' />
					<Skeleton className='w-14 h-4' />
				</span>
				<span className='flex flex-col space-y-2'>
					<Skeleton className='w-24 h-4' />
					<Skeleton className='w-14 h-4' />
				</span>
			</CardFooter>
		</Card>
	);
};

export default SlugCardSkelton;
