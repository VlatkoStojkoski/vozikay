'use client';

import { LogOut, Route, User, Wallet } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function UserActionsMenu() {
	return <DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button className="w-12 h-12 p-2 rounded-full" variant="outline">
				<User />
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
					<Wallet className="w-4 h-4 mr-2" /> Sign Out
				</div>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
}