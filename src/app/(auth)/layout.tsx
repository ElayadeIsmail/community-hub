import { isAuthenticated } from '@/utils/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
	if (isAuthenticated()) {
		redirect('/');
	}
	return <>{children}</>;
};

export default layout;
