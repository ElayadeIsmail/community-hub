'use client';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';
import { User } from 'next-auth';

const Profile = ({ user }: { user: Omit<User, 'id'> }) => {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button
					className='border rounded px-4 py-2'
					aria-label='Open Profile'>
					{user.name}
				</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content className='PopoverContent' sideOffset={5}>
					<Popover.Close className='PopoverClose' aria-label='Close'>
						<Cross2Icon />
					</Popover.Close>
					<Popover.Arrow className='PopoverArrow' />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};

export default Profile;
