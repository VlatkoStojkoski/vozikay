'use client';

import Link from "next/link";
import { LogOut, Route, User, Wallet } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

type UserActionsMenuProps = {
	avatar?: JSX.Element | null;
};

export default function UserActionsMenu({ avatar, ...props }: UserActionsMenuProps) {
	return <DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button className="relative w-12 h-12 p-0 rounded-full" variant="outline">
				{
					avatar ? avatar : <User />
				}
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent className="min-w-36" align="end" alignOffset={-20}>
			<DropdownMenuLabel>My Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItem className="px-3 py-2.5" asChild>
				<Link href="/dashboard/profile">
					<User className="w-4 h-4 mr-2" /> Profile
				</Link>
			</DropdownMenuItem>
			<DropdownMenuItem className="px-3 py-2.5" asChild>
				<Link href="/dashboard/rides">
					<Route className="w-4 h-4 mr-2" /> Rides
				</Link>
			</DropdownMenuItem>
			<DropdownMenuItem className="px-3 py-2.5" asChild>
				<Link href="/dashboard/wallet">
					<Wallet className="w-4 h-4 mr-2" /> Wallet
				</Link>
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem className="px-3 py-2.5 text-destructive" asChild>
				<div onClick={() => {
					const supabase = createClient();
					supabase.auth.signOut();
				}}>
					<LogOut className="w-4 h-4 mr-2" /> Sign Out
				</div>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
}