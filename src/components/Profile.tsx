'use client';
import { getInitialsFromName } from '@/lib/utils';
import * as Avatar from '@radix-ui/react-avatar';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';
import { User } from 'next-auth';

const Profile = ({ user }: { user: User }) => {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button
					className='border rounded px-2 py-1 flex space-x-2 items-center'
					aria-label='Open Profile'>
					<Avatar.Root className='w-8 h-8 rounded-full'>
						<Avatar.Image
							className={'w-8 h-8 rounded-full'}
							src={user.image || ''}
							alt='Colm Tuite'
						/>
						<Avatar.Fallback
							className='w-8 h-8 rounded-full flex items-center justify-center bg-accent'
							delayMs={600}>
							{getInitialsFromName(user.name || '')}
						</Avatar.Fallback>
					</Avatar.Root>
					<span>{user.name}</span>
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
