'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui';

import * as actions from '@/actions';
import {
	ContentField,
	FormError,
	FromInput,
	SubmitButton,
} from '@/components/form';
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
					<FormError error={formState.formError} />
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
