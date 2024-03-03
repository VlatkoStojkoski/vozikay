import Link from "next/link";
import { cookies } from "next/headers";

import UserActionsMenu from "@/components/navbar/user-actions-menu";
import AnonNavbar from "@/components/navbar/anon-navbar";
import AuthNavbar from "@/components/navbar/auth-navbar";
import { SignInButton } from "@/components/auth-buttons";
import { Card } from "@/components/ui/card";
import Logo from "@/components/icons/logo";
import { createClient } from "@/utils/supabase/server";

export default async function Navbar() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data: { user }, error } = await supabase.auth.getUser();

	let navbarContent: JSX.Element;

	console.log({ user, error })

	if (user === null) {
		navbarContent = <AnonNavbar />;
	} else {
		const { data: profile } = await supabase.from('profiles').select().eq('id', user.id).single();
		navbarContent = <AuthNavbar user={user} profile={profile} />;
	}

	return <div className="fixed top-0 w-full left-0 z-40 p-3">
		<Card className="flex container max-w-screen-lg !mx-auto justify-between items-center px-6 py-3 backdrop-blur-[3px] bg-[#ffffffaa]">
			{navbarContent}
		</Card>
		<div className="h-navbar w-full"></div>
	</div>;
}