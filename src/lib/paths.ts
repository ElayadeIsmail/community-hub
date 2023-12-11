const paths = {
	home: () => {
		return '/' as const;
	},
	register: () => {
		return '/register' as const;
	},
	login: () => {
		return '/login' as const;
	},
	showCommunity: (slug: string) => {
		return `/community/${slug}` as const;
	},
	newPost: (slug: string) => {
		return `/community/${slug}/posts/new` as const;
	},
	showPost: (slug: string, postId: string) => {
		return `/community/${slug}/posts/${postId}` as const;
	},
};

export default paths;
