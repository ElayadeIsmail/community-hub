'use client';
import { AvatarPlaceholder } from '@/lib/constants';
import * as Avatar from '@radix-ui/react-avatar';
import * as Popover from '@radix-ui/react-popover';
import { User } from 'next-auth';
import Image from 'next/image';

const Profile = ({ user }: { user: User }) => {
	return (
		<Popover.Root>
			<Popover.Trigger className='flex mr-2 items-center min-w-[140px] justify-between border rounded px-2 py-1'>
				<p className='flex items-center'>
					<Avatar.Root className='w-8 h-8 rounded-full'>
						<Image
							className={'w-8 h-8 rounded-full'}
							src={user.image || AvatarPlaceholder}
							alt='Colm Tuite'
						/>
					</Avatar.Root>
					<span>{user.name}</span>
				</p>
			</Popover.Trigger>
			<Popover.Portal></Popover.Portal>
		</Popover.Root>
	);
};

export default Profile;
