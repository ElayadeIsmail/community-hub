'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const SimpleMDE = dynamic(() => import('@/components/simpleMDE'), {
	ssr: false,
});

import * as actions from '@/actions';
import { ContentField, FromInput, SubmitButton } from '@/components/form';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useFormState } from 'react-dom';

const CreatePostForm = ({ slug }: { slug: string }) => {
	const [content, setContent] = useState('');
	const [formState, dispatch] = useFormState(
		actions.createPost.bind(null, { slug, content }),
		{
			fieldErrors: {},
			formError: null,
		}
	);
	return (
		<Card className='sticky top-4 h-fit'>
			<CardHeader>
				<CardTitle>Create New Post</CardTitle>
				<CardDescription>
					Remember to be kind and respect the community rules
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={dispatch} className='space-y-2'>
					<FromInput
						placeholder='Title (required)'
						name='title'
						errors={formState.fieldErrors.title}
					/>

					<ContentField
						value={content}
						onChange={(value) => setContent(value)}
						placeholder='Content (required)'
						errors={formState.fieldErrors.content}
					/>
					<div className='items-center flex justify-end'>
						<SubmitButton>Save</SubmitButton>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default CreatePostForm;
