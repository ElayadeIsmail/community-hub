import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Skeleton,
} from '@/components/ui';
import { PlusIcon } from 'lucide-react';

const PopularCommunitiesSkelton = () => {
	const renderedCommunities = Array.from({ length: 8 }).map((_, idx) => {
		return <Skeleton className='h-4 w-36' key={`community_${idx}`} />;
	});
	return (
		<Card className='sticky top-4 h-fit'>
			<CardHeader>
				<CardTitle className='flex items-center justify-between text-xl'>
					Popular Communities
					<Button size='icon'>
						<PlusIcon />
					</Button>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className='flex flex-col space-y-4'>
					{renderedCommunities}
				</ul>
			</CardContent>
		</Card>
	);
};

export default PopularCommunitiesSkelton;
