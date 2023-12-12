'use client';
import * as actions from '@/actions';
import { cn, formatNumber } from '@/lib/utils';
import { Vote } from '@prisma/client';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { useState } from 'react';

interface Props {
	points: number;
	postId: string;
	currentVote?: Vote;
}

const PostActions = ({ points, postId, currentVote }: Props) => {
	const [currentPoints, setCurrentPoints] = useState(() => points);
	const [userVote, setUserVote] = useState<number>(() => {
		if (currentVote) return currentVote.value;
		return 0;
	});
	return (
		<div className='flex flex-col items-center'>
			<button
				onClick={async () => {
					const result = await actions.vote({
						postId,
						vote: userVote === 1 ? 0 : 1,
					});
					if (result.status === 'success') {
						setUserVote(result.data.vote);
						setCurrentPoints(result.data.points);
					}
				}}>
				<ArrowBigUp
					className={cn({
						'fill-primary text-primary': userVote === 1,
					})}
				/>
			</button>
			<span className='font-bold text-xs'>
				{formatNumber(currentPoints)}
			</span>
			<button
				onClick={async () => {
					const result = await actions.vote({
						postId,
						vote: userVote === -1 ? 0 : -1,
					});
					if (result.status === 'success') {
						setUserVote(result.data.vote);
						setCurrentPoints(result.data.points);
					}
				}}>
				<ArrowBigDown
					className={cn({
						'fill-indigo-800 text-indigo-800': userVote === -1,
					})}
				/>
			</button>
		</div>
	);
};

export default PostActions;
