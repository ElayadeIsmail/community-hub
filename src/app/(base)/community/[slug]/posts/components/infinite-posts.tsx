'use client';
import { Spinner } from '@/components/ui';
import { IPostsList } from '@/db/queries/posts';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useRef, useState } from 'react';
import PostCard from './post-card';

interface Props {
	initialPosts: IPostsList;
	fetcher: (curser?: string) => Promise<IPostsList>;
}

const InfinitePosts = ({ fetcher, initialPosts }: Props) => {
	const [posts, setPosts] = useState(() => initialPosts);
	const [isLoading, setIsLoading] = useState(false);
	const [isLastPage, setIsLastPage] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const entry = useIntersectionObserver(ref, {});

	const isVisible = !!entry?.isIntersecting;
	const lastPostId = posts[posts.length - 1]?.id;

	useEffect(() => {
		const updatePosts = async () => {
			if (isLastPage || isLoading) return;
			setIsLoading(true);
			const newPosts = await fetcher(lastPostId);
			if (newPosts.length === 0) {
				setIsLastPage(true);
			}
			setPosts((prv) => [...prv, ...newPosts]);
			setIsLoading(false);
		};
		if (isVisible) {
			updatePosts();
		}
	}, [isVisible, isLastPage, isLoading, fetcher, lastPostId]);

	const renderedPosts = posts.map((_post) => {
		return <PostCard post={_post} key={_post.id} />;
	});

	const hasNoResult = posts.length === 0 && !isLoading;

	return (
		<div className='flex flex-col space-y-3'>
			{!hasNoResult ? (
				<>
					{renderedPosts}
					<div className='h-1' ref={ref} />
					{isLoading && <Spinner />}
				</>
			) : (
				<h2>Hm... we couldn’t find any posts</h2>
			)}
		</div>
	);
};

export default InfinitePosts;
