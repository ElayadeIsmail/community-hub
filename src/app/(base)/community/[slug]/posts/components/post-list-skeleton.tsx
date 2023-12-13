import PostSkeleton from './post-skeleton';

const PostListSkeleton = () => {
	const renderedPosts = Array.from({ length: 20 }).map((_, idx) => {
		return <PostSkeleton key={idx} />;
	});
	return <div className='flex flex-col space-y-4'>{renderedPosts}</div>;
};

export default PostListSkeleton;
