import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import { getCommunityBySlug } from '@/db/queries/communities';
import { formatNumber, formateDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

const SlugCard = async ({ slug }: { slug: string }) => {
	const community = await getCommunityBySlug(slug);
	if (!community) {
		notFound();
	}
	return (
		<Card className='sticky top-4 h-fit'>
			<CardHeader>
				<CardTitle>{community.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>{community.description}</CardDescription>
			</CardContent>
			<CardFooter className='flex items-center text-sm text-center justify-between'>
				<span className='flex flex-col '>
					<span className='font-semibold'>Members</span>
					<span className='text-xs text-muted-foreground'>
						{formatNumber(community._count.users)}
					</span>
				</span>
				<span className='flex flex-col'>
					<span className='font-semibold'>Posts</span>
					<span className='text-xs text-muted-foreground'>
						{formatNumber(community._count.posts)}
					</span>
				</span>
				<span className='flex flex-col'>
					<span className='font-semibold'>CreatedAt</span>
					<span className='text-xs text-muted-foreground'>
						{formateDate(community.createdAt)}
					</span>
				</span>
			</CardFooter>
		</Card>
	);
};

export default SlugCard;
