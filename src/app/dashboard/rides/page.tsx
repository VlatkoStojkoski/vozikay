import { Ride, listRides } from "@/actions/db";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { env } from "@/env";
import { toFirstUpperCase } from "@/utils/general";
import { createClient } from "@/utils/supabase/server";
import { Calendar, Clock, Coins, Locate, Users } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RidesPage() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const rides = await listRides(supabase);

	return <div className="container max-w-xl mx-auto mt-28 items-center">
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
						return <DriverRideCard key={index} {...ride} />
					})
			}
		</div>
	</div>
}

function DriverRideCard({
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
					<p className="text-lg font-semibold">{total_price} MKD</p>
				</div>
				<div className="flex-n-center">
					<Coins className="tw-8" />
				</div>
			</div>
		</CardFooter>
	</Card >
}