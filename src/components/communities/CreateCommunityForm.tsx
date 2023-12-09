'use client';
import * as actions from '@/actions';
import { PlusIcon } from '@radix-ui/react-icons';
import { useFormState } from 'react-dom';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../Dialog';
import { FormError, FromInput, SubmitButton, TextAreaInput } from '../form';
import { Button } from '../ui';

const CreateCommunityForm = () => {
	const [formState, dispatch] = useFormState(actions.createCommunity, {
		fieldErrors: {},
		formError: null,
	});
	return (
		<Dialog>
			<DialogTrigger>
				<Button size='icon'>
					<PlusIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Community</DialogTitle>
				</DialogHeader>
				<FormError error={formState.formError} />
				<form
					id='create-community-form'
					className='space-y-2'
					action={dispatch}>
					<FromInput
						placeholder='Slug'
						label='Slug'
						name='slug'
						errors={formState.fieldErrors.slug}
					/>
					<FromInput
						placeholder='Title'
						label='Title'
						name='title'
						errors={formState.fieldErrors.title}
					/>
					<TextAreaInput
						placeholder='Description'
						label='Description'
						name='description'
						errors={formState.fieldErrors.description}
					/>
					<div className='flex items-center justify-end space-x-2'>
						<Button
							form='create-community-form'
							variant='outline'
							type='reset'>
							Reset
						</Button>
						<SubmitButton type='submit'>Submit</SubmitButton>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateCommunityForm;
