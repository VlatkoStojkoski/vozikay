import { cookies } from "next/headers";
import Link from "next/link";
import { listRides } from "@/actions/db";
import { RideCard } from "@/components/ride-card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function RidesPage() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const rides = await listRides(supabase);

	return <main className="max-w-screen-sm px-4 py-6 mx-auto">
		<h1 className="mb-4">Arranged rides:</h1>
		<div className="flex flex-col gap-4">
			<Button className="block w-full mx-auto font-semibold text-xl h-auto py-3" asChild>
				<Link href='/dashboard/rides/new' className="text-center">
					+ New Ride
				</Link>
			</Button>
			{
				rides === null ?
					<h1>No rides availible...</h1> :
					rides.map((ride, index) => {
						return <RideCard key={index} {...ride} />
					})
			}
		</div>
	</main>
}