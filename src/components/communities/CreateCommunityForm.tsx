'use client';
import * as actions from '@/actions';
import { PlusIcon } from '@radix-ui/react-icons';
import { useFormState } from 'react-dom';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../Dialog';
import { FromInput, SubmitButton, TextAreaInput } from '../form';
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
				<form
					id='create-community-form'
					className='space-y-2'
					action={dispatch}>
					<FromInput
						placeholder='Title'
						name='slug'
						errors={formState.fieldErrors.slug}
					/>
					<FromInput
						placeholder='Title'
						name='title'
						errors={formState.fieldErrors.title}
					/>
					<TextAreaInput
						placeholder='Description'
						name='description'
						errors={formState.fieldErrors.description}
					/>
				</form>
				<DialogFooter>
					<Button
						form='create-community-form'
						variant='outline'
						type='reset'>
						Reset
					</Button>
					<SubmitButton form='create-community-form'>
						Submit
					</SubmitButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateCommunityForm;
