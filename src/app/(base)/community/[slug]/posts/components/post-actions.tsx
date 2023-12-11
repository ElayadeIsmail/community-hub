'use client';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';

const PostActions = () => {
	return (
		<div className='flex flex-col items-center'>
			<button
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<ArrowBigUp />
			</button>
			<span>0</span>
			<button
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<ArrowBigDown />
			</button>
		</div>
	);
};

export default PostActions;
