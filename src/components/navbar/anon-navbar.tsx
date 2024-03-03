import Link from "next/link";
import Logo from "@/components/icons/logo";
import { SignInButton } from "@/components/auth-buttons";

export default function AnonNavbar() {
	return <>
		<Link href='/' className="w-32">
			<Logo isSeperated={false} />
		</Link>

		<SignInButton label="Get Started" />
	</>;
}	