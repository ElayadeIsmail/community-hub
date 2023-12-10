import { getPopularCommunities } from '@/db/queries/communities';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../../../../components/ui/card';
const CreateCommunityForm = dynamic(() => import('./create-community-form'), {
	ssr: false,
});

const PopularCommunities = async () => {
	const communities = await getPopularCommunities();
	const renderedCommunities = communities.map((_community) => {
		return (
			<Link
				className='font-semibold text-primary underline'
				href={`/community/${_community.slug}`}
				key={_community.slug}>
				{_community.title}
			</Link>
		);
	});
	return (
		<Card className='sticky top-4 h-fit'>
			<CardHeader>
				<CardTitle className='flex items-center justify-between text-xl'>
					Popular Communities
					<CreateCommunityForm />
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className='flex flex-col space-y-2'>
					{renderedCommunities}
				</ul>
			</CardContent>
		</Card>
	);
};

export default PopularCommunities;
