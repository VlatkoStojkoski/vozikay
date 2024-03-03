import { User } from "@supabase/supabase-js";
import UserActionsMenu from "@/components/navbar/user-actions-menu";
import Logo from "@/components/icons/logo";
import { Database } from "@/utils/supabase/db";
import Link from "next/link";

export type AuthNavbarProps = {
	user: User;
	profile: Database['public']['Tables']['profiles']['Row'] | null;
};

export default function AuthNavbar(props: AuthNavbarProps) {
	return <>
		<Link href='/' className="w-32">
			<Logo isSeperated={false} />
		</Link>

		<UserActionsMenu avatar={
			props.profile ?
				// eslint-disable-next-line @next/next/no-img-element
				<img src={props.profile.avatar} alt="Avatar" className="object-cover rounded-full" /> :
				null
		} />
	</>;
}	