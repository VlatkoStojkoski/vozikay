import { env } from "@/env";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(req: Request, res: Response) {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { data: { user: user } } = await supabase.auth.getUser();

	if (!user) {
		return Response.redirect(new URL('/login', env.NEXT_PUBLIC_BASE_URL))
	}

	const { data: rides } = await supabase.from('rides').select(`
		*,
		from(id,name),
		to(id,name)
	`).eq('driver', user.id);

	console.log({ rides });

	if (!rides) {
		return Response.json([])
	}

	return Response.json(rides);
}