import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { getPopularCommunities } from '@/db/queries/communities';
import paths from '@/lib/paths';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const CreateCommunityForm = dynamic(() => import('./create-community-form'), {
	ssr: false,
});

const PopularCommunities = async () => {
	const communities = await getPopularCommunities();
	const renderedCommunities = communities.map((_community) => {
		return (
			<li key={_community.slug}>
				<Link
					className='font-semibold text-primary underline'
					href={paths.showCommunity(_community.slug)}>
					{_community.title}
				</Link>
			</li>
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
