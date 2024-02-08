'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ButtonNumberInput, CityInput, Input, NumberInput } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { newRideFormSchema } from "@/utils/supabase/schemas";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/utils/supabase/db";
import { useEffect, useMemo, useState } from "react";
import { Calendar, Flag, Locate, Ticket, Users } from "lucide-react";
import { Ride, findRides } from "@/actions/db";
import { usePathname, useRouter } from "next/navigation";
import { env } from "@/env";

const findRidesSchema = z.object({
	from: z.coerce.number(),
	to: z.coerce.number(),
	date: z.coerce.string(),
	passengers: z.coerce.number(),
});

export default function FindRidesForm() {
	const supabase = useMemo(() => createClient(), []);

	const [cities, setCities] = useState<{
		value: string;
		label: string;
	}[]>([]);

	const form = useForm<z.infer<typeof findRidesSchema>>({
		resolver: zodResolver(findRidesSchema),
		defaultValues: {
			from: 0,
			to: 0,
			date: new Date().toISOString().split('T')[0],
			passengers: 1,
		},
	});

	useEffect(() => {
		const getCities = async () => {
			const { data, error } = await supabase.from("cities").select();
			if (error) {
				throw error;
			}
			return data as Database['public']['Tables']['cities']['Row'][];
		}

		getCities().then((_cities) => {
			setCities(_cities.filter(c => c.name !== null).map(city => ({
				value: String(city.id),
				label: city.name as string
			})));
		});
	}, [supabase]);

	const router = useRouter();

	async function onSubmit() {
		const { from, to, date, passengers } = form.getValues();

		const url = new URL('/rides', env.NEXT_PUBLIC_BASE_URL);
		url.searchParams.set('from', String(from));
		url.searchParams.set('to', String(to));
		url.searchParams.set('date', date);
		url.searchParams.set('passengers', String(passengers));

		router.push(url.href);
	}

	return <Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md mt-24 w-full">
			<FormField
				control={form.control}
				name="from"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<div className="flex items-center gap-x-2 w-full">
								<Locate className="text-gray-500 w-8" />
								<CityInput
									placeholder="Leaving from..."
									className="flex-1"
									cities={cities}
									{...field}
								/>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="to"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<div className="flex items-center gap-x-2 w-full">
								<Flag className="text-gray-500 w-8" />
								<CityInput
									placeholder="Going to..."
									className="flex-1"
									cities={cities}
									{...field}
								/>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className="flex flex-row gap-2 w-full">
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormControl>
								<div className="flex items-center gap-x-2">
									<Calendar className="text-gray-500 min-w-8" />
									<Input type="date" {...field} />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="passengers"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className="flex items-center gap-x-2">
									<Users className="text-gray-500 min-w-8" />
									<NumberInput className="max-w-20" {...field} />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<Button className="w-full mt-4 bg-red-500 text-white">Find Rides</Button>
		</form>
	</Form>;
}