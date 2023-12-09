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
};

export default paths;
