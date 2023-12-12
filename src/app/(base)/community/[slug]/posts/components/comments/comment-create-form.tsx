'use client';

import { SubmitButton, TextAreaInput } from '@/components/form';
import { Button } from '@/components/ui';

const CreateCommentForm = () => {
	return (
		<div>
			<Button variant='ghost' size='sm'>
				Replay
			</Button>
			<form action=''>
				<div className='space-y-2 mt-1'>
					<TextAreaInput placeholder='Enter your comment' />
					<SubmitButton>Submit</SubmitButton>
				</div>
			</form>
		</div>
	);
};

export default CreateCommentForm;
