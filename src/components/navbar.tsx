import { SignInButton } from "@/components/auth-buttons";
import Logo from "@/components/icons/logo";
import { Card } from "./ui/card";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import UserActionsMenu from "./user-actions-menu";

export default async function Navbar() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const user = await supabase.auth.getUser();

	const headerStore = headers();
	const pathname = headerStore.get('x-url-pathname');

	// const ignoreAddingSpacePaths: string[] = ['/',];
	// const shouldAddSpace = pathname !== null ? ignoreAddingSpacePaths.includes(pathname) : false;

	return <>
		<div className="fixed top-0 w-full left-0 z-40 p-3">
			<Card className="flex container max-w-screen-lg !mx-auto justify-between items-center px-6 py-3 backdrop-blur-[3px] bg-[#ffffffaa]" >
				<Link href='/' className="w-32">
					<Logo isSeperated={false} />
				</Link>

				{
					user.data.user === null ?
						<SignInButton label="Get Started" /> :
						<UserActionsMenu />
				}
			</Card>
		</div>
		{/* {
			shouldAddSpace ?
				<></> : */}
		<div className="h-navbar w-full" />
		{/* } */}
	</>
}