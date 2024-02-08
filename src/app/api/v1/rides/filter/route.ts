import { findRides, findRidesSchema } from "@/actions/db";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";

export async function GET(req: Request, res: Response) {
	try {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { searchParams } = new URL(req.url);
		const payload = {
			from: Number(searchParams.get('from')),
			to: Number(searchParams.get('to')),
			date: searchParams.get('date'),
			passengers: Number(searchParams.get('passengers')),
		};

		const body = findRidesSchema.parse(payload);

		const rides = await findRides(supabase, body);

		return Response.json(rides);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return Response.json({ error: error.errors }, { status: 400 });
		}

		if (error instanceof Error) {
			return Response.json({ error: error.message }, { status: 500 });
		}

		return Response.json({ error: "An unknown error occurred" }, { status: 500 });
	}
}