import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import db from '@/db';
import { notFound } from 'next/navigation';

interface Props {
	params: { slug: string };
}

const DisplayCommunityPage = async ({ params }: Props) => {
	const community = await db.community.findUnique({
		where: {
			slug: params.slug,
		},
		select: {
			title: true,
			description: true,
			createdAt: true,
			_count: {
				select: {
					posts: true,
					users: true,
				},
			},
		},
	});
	if (!community) {
		notFound();
	}
	return (
		<section className='container grid grid-cols-4 gap-4 p-4'>
			<div className='col-span-3'>
				<h1 className='text-xl m-2'>Posts Sections</h1>
			</div>
			<Card className='sticky top-4 h-fit'>
				<CardHeader>
					<CardTitle>{community.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>{community.description}</CardDescription>
				</CardContent>
				<CardFooter className='flex items-center text-center justify-between'>
					<span className='flex flex-col '>
						<span>Members</span>
						<span>10</span>
					</span>
					<span className='flex flex-col'>
						<span>Posts</span>
						<span>10</span>
					</span>
					<span className='flex flex-col'>
						<span>CreatedAt</span>
						<span>10</span>
					</span>
				</CardFooter>
			</Card>
		</section>
	);
};

export default DisplayCommunityPage;
