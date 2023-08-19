import { CreditCard, LogOut, PlusCircle, Settings, User } from 'lucide-react'; // Import Lucide icons

// Import UI components from the project
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Define the UserNav functional component
export function UserNav() {
	return (
		<DropdownMenu>
			{/* Dropdown Menu container */}
			<DropdownMenuTrigger asChild>
				{/* Trigger element */}
				<Button
					variant='ghost'
					className='relative h-8 w-8 rounded-full'
				>
					<Avatar className='h-8 w-8'>
						{/* User avatar */}
						<AvatarImage
							src='/avatars/01.png'
							alt='@shadcn'
						/>
						<AvatarFallback>SC</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-56'
				align='end'
				forceMount
			>
				<DropdownMenuLabel className='font-normal'>
					{/* User information */}
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>shadcn</p>
						<p className='text-xs leading-none text-muted-foreground'>
							m@example.com
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator /> {/* Separator line */}
				<DropdownMenuGroup>
					{/* Group of menu items */}
					<DropdownMenuItem>
						<User className='mr-2 h-4 w-4' />
						<span>Profile</span>
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard className='mr-2 h-4 w-4' />
						<span>Billing</span>
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings className='mr-2 h-4 w-4' />
						<span>Settings</span>
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<PlusCircle className='mr-2 h-4 w-4' />
						<span>New Team</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator /> {/* Separator line */}
				<DropdownMenuItem>
					{/* Log out menu item */}
					<LogOut className='mr-2 h-4 w-4' />
					<span>Log out</span>
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
