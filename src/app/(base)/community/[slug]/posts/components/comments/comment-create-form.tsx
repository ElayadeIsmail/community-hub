'use client';

import * as actions from '@/actions';
import { FormError, SubmitButton, TextAreaInput } from '@/components/form';
import { Button } from '@/components/ui';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

interface Props {
	postId: string;
	parentId?: string;
	startOpen?: boolean;
}

const CreateCommentForm = ({ postId, startOpen, parentId }: Props) => {
	const [open, setOpen] = useState(() => startOpen);
	const [formState, action] = useFormState(
		actions.createComment.bind(null, {
			postId,
			parentId,
		}),
		{
			errors: { fieldErrors: {} },
		}
	);
	const ref = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (!startOpen) {
			setOpen(false);
		}
		if (formState.success) {
			ref.current?.reset();
		}
	}, [formState.success, startOpen]);

	return (
		<div>
			<Button
				variant='secondary'
				size='sm'
				onClick={() => setOpen((prv) => !prv)}>
				Replay
			</Button>
			{open && (
				<form ref={ref} action={action}>
					<FormError error={formState.errors.formError} />
					<div className='space-y-2 mt-1'>
						<TextAreaInput
							placeholder='Enter your comment'
							name='content'
							errors={formState.errors.fieldErrors.content}
						/>
						<SubmitButton>Submit</SubmitButton>
					</div>
				</form>
			)}
		</div>
	);
};

export default CreateCommentForm;
