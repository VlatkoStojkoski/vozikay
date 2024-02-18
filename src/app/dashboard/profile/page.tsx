import { getProfile } from "@/actions/db"
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import CreateProfile from "./create-profile";


function Profile() {
	return <></>
}

export default async function ProfilePage() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const profile = await getProfile(supabase);

	console.log({ profile })

	return profile !== null ? <Profile /> : <CreateProfile />;
}