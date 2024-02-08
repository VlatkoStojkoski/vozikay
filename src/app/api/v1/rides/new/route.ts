import { env } from "@/env";
import { newRideFormSchema } from "@/utils/supabase/schemas"
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: Request, res: Response) {
	const formData = await req.formData()

	const payload = {
		from: formData.get('from'),
		to: formData.get('to'),
		start_timestamp: formData.get('start_timestamp'),
		capacity: formData.get('capacity'),
		total_price: formData.get('total_price'),
	}

	const body = newRideFormSchema.parse(payload);

	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const now = new Date().toISOString();
	const { data: user } = await supabase.auth.getUser();

	if (!user) {
		return Response.redirect('/login')
	}

	const { data, error } = await supabase.from('rides').insert({
		from: body.from,
		to: body.to,
		start_timestamp: body.start_timestamp,
		capacity: body.capacity,
		total_price: body.total_price,
		created_at: now,
		driver: user.user?.id
	});

	console.log({ data, error });

	const redirectUrl = new URL('/rides', env.NEXT_PUBLIC_BASE_URL)

	return Response.redirect(redirectUrl)
}