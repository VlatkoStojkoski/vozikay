import { env } from "@/env";
import { Database } from "@/utils/supabase/db";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export interface Ride {
	id: number;
	from: {
		id: number;
		name: string;
	};
	to: {
		id: number;
		name: string;
	};
	start_timestamp: string;
	price: number;
	capacity: number;
}

export async function listRides(supabase: SupabaseClient<Database>) {
	const { data: { user: user } } = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	const { data: rides } = await supabase.from('rides').select(`
		*,
		from(id,name),
		to(id,name)
	`).eq('driver', user.id).order('start_timestamp').returns<Ride[]>();

	console.log({ rides });

	if (!rides) {
		return [];
	}

	return rides;
}

export const findRidesSchema = z.object({
	from: z.number(),
	to: z.number(),
	date: z.string(),
	passengers: z.number(),
});

export type FindRidesParams = z.infer<typeof findRidesSchema>;

export async function findRidesOnDate(supabase: SupabaseClient<Database>, { from, to, date }: FindRidesParams) {
	const gtDate = new Date(date);
	gtDate.setHours(0, 0, 0, 0);
	const ltDate = new Date(date);
	ltDate.setHours(23, 59, 59, 999);

	const { data: rides } = await supabase
		.from('rides')
		.select(`
			*,
			from!inner(*),
			to!inner(*)
		`)
		.eq('from.id', from)
		.eq('to.id', to)
		.gte('start_timestamp', gtDate.toISOString())
		.lte('start_timestamp', ltDate.toISOString())
		.order('start_timestamp')
		.returns<Ride[]>();

	if (rides === null) {
		return [];
	}

	return rides;
}

export async function findRidesAroundDate(supabase: SupabaseClient<Database>, { from, to, date }: FindRidesParams) {
	const gtDate = new Date(date);
	gtDate.setHours(0, 0, 0, 0);
	gtDate.setDate(gtDate.getDate() - 3);

	const ltDate = new Date(date);
	ltDate.setHours(23, 59, 59, 999);
	ltDate.setDate(ltDate.getDate() + 3);

	const { data: rides } = await supabase
		.from('rides')
		.select(`
			*,
			from!inner(*),
			to!inner(*)
		`)
		.eq('from.id', from)
		.eq('to.id', to)
		.gte('start_timestamp', gtDate.toISOString())
		.lte('start_timestamp', ltDate.toISOString())
		// .order('start_timestamp')
		// .order('' `ABS(EXTRACT(EPOCH FROM start_timestamp - '${dateIso}+00'::timestamp))`)
		.limit(10)
		.returns<Ride[]>();

	if (rides === null) {
		return [];
	}

	const sortedRides = rides.sort((a, b) => {
		const dateA = new Date(a.start_timestamp).getTime();
		const dateB = new Date(b.start_timestamp).getTime();
		const dateCmp = new Date(date).getTime();

		const epochA = Math.abs((dateA - dateCmp) / 1000);
		const epochB = Math.abs((dateB - dateCmp) / 1000);

		return epochA - epochB;
	});

	return sortedRides;
}