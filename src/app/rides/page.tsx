import { Ride, findRides } from "@/actions/db";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { toFirstUpperCase } from "@/utils/general";
import { createClient } from "@/utils/supabase/server";
import { Locate, Calendar, Clock, Users, Coins } from "lucide-react";
import { cookies } from "next/headers";

export default async function FilteredRidesPage({
	searchParams: {
		from,
		to,
		date,
		passengers,
	}
}: {
	searchParams: {
		from: string;
		to: string;
		date: string;
		passengers: string;
	}
}) {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const rides = await findRides(supabase, {
		from: Number(from),
		to: Number(to),
		date,
		passengers: Number(passengers),
	});

	return <div className="flex flex-col gap-3 pt-32 max-w-lg mx-auto">
		<h1>Found Rides:</h1>
		{rides.map(ride => <RiderRideCard key={ride.id} {...ride} />)}
	</div>
}

function RiderRideCard({
	from, to, start_timestamp, total_price, capacity
}: Ride) {
	return <Card>
		<CardHeader className="flex flex-row gap-2 items-center">
			<Locate className="w-8" />
			<div className="">
				<p className="flex flex-row items-center gap-1 text-gray-500 text-sm">
					<Calendar className="w-4 h-4" /> {new Date(start_timestamp).toLocaleDateString()}
					<Clock className="w-4 h-4 ml-2" /> {new Date(start_timestamp).toLocaleTimeString()}
				</p>
				<p className="!m-0 text-lg">From <b className="font-semibold">{toFirstUpperCase(from.name)}</b> to <b className="font-semibold">{toFirstUpperCase(to.name)}</b></p>
			</div>
		</CardHeader>

		<CardFooter className="flex flex-row justify-between">
			<div className="grid grid-cols-[2rem_auto] gap-x-2 w-fit">
				<div className="flex-n-center">
					<Users className="text-gray-800 w-8" />
				</div>
				<div className="flex flex-col text-center">
					<p className="text-gray-500">Seats</p>
					<p className="text-lg">0/{capacity}</p>
				</div>
			</div>

			<div className="grid grid-cols-[auto_2rem] gap-x-2 w-fit px-3 py-2 bg-yellow-300 rounded-md">
				<div className="flex flex-col text-center">
					<p className="text-black">Price</p>
					<p className="text-lg font-semibold">{(total_price / capacity).toFixed(0)} MKD</p>
				</div>
				<div className="flex-n-center">
					<Coins className="tw-8" />
				</div>
			</div>
		</CardFooter>
	</Card >
}