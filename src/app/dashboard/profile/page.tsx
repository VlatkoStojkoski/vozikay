import { getProfile } from "@/actions/db"
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import CreateProfile from "./create-profile";
import Profile from "./profile";

export default async function ProfilePage() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const profile = await getProfile(supabase);

	return profile !== null ? <Profile profile={profile} /> : <CreateProfile />;
}