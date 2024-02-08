'use client';

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ButtonNumberInput, CityInput, Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { newRideFormSchema } from "@/utils/supabase/schemas";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/utils/supabase/db";

export default function NewRidePage() {
	const supabase = useMemo(() => createClient(), []);

	const [cities, setCities] = useState<{
		value: string;
		label: string;
	}[]>([]);

	const form = useForm<z.infer<typeof newRideFormSchema>>({
		resolver: zodResolver(newRideFormSchema),
		defaultValues: {
			from: 0,
			to: 0,
			start_timestamp: "",
			capacity: 0,
			total_price: 0,
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

	return <div className="max-w-lg mx-auto pt-48 px-6">
		<div className="relative p-4 bg-red-500 rounded-lg">
			<div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 h-52 aspect-[1191/569]">
				<Image
					src="/assets/img/car-illustration.png"
					alt=""
					fill
					style={{ objectFit: "cover" }}
					quality={100}
				/>
			</div>
			<Form {...form}>
				<form action="/api/v1/rides/new" method="POST" className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md mt-24 w-full">
					<FormField
						control={form.control}
						name="from"
						render={({ field }) => (
							<FormItem>
								<FormLabel>What city are you leaving from?</FormLabel>
								<FormControl>
									<CityInput
										cities={cities}
										{...field}
									/>
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
								<FormLabel>What city are you going to?</FormLabel>
								<FormControl>
									<CityInput
										cities={cities}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="start_timestamp"
						render={({ field }) => (
							<FormItem>
								<FormLabel>When are you leaving?</FormLabel>
								<FormControl>
									<Input type="datetime-local" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="capacity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>How many people can you take?</FormLabel>
								<FormControl>
									<ButtonNumberInput {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="total_price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>What&apos;s the total cost of the ride?</FormLabel>
								<FormControl>
									<div className="flex flex-row gap-2 items-center">
										<Input type="number" step={20} {...field} className="w-32" />
										<p className="text-lg font-semibold">MKD</p>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button className="w-full bg-red-500 text-white">Publish Ride</Button>
				</form>
			</Form>
		</div>
	</div>
}