'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { CityInput, DateInput, NumberInput } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/utils/supabase/db";
import { useEffect, useMemo, useState } from "react";
import { CalendarIcon, Flag, Locate, Users } from "lucide-react";
import { useRouter } from "next/navigation";
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
		<form onSubmit={form.handleSubmit(onSubmit)} className="shadow-md">
			<div className="flex flex-col gap-3 px-4 sm:px-6">
				<FormField
					control={form.control}
					name="from"
					render={({ field }) => (
						<FormItem className="">
							<FormControl>
								<div className="flex items-center  gap-x-2">
									<Locate className="text-gray-500 min-w-8" />
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
						<FormItem className="">
							<FormControl>
								<div className="flex items-center  gap-x-2">
									<Flag className="text-gray-500 min-w-8" />
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

				<div className="flex flex-row  gap-2">
					<FormField
						control={form.control}
						name="date"
						render={({ field }) => (
							<FormItem className="">
								<FormControl>
									<div className="flex items-center gap-x-2">
										<CalendarIcon className="text-gray-500 min-w-8" />
										<DateInput className="border-b" {...field} />
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
							<FormItem className="">
								<FormControl>
									<div className="flex items-center  gap-x-2">
										<Users className="text-gray-500 min-w-8" />
										<NumberInput className="max-w-20 border-0 border-b" {...field} />
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>

			<Button className="w-full mt-8 rounded-t-none">Find Rides</Button>
		</form>
	</Form>;
}