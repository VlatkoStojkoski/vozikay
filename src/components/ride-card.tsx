'use client';

import { Ride } from "@/actions/db";
import { Card } from "@/components/ui/card"
import { toFirstUpperCase } from "@/utils/general";
import { cn } from "@/utils/style";
import { ArrowRight, Calendar, Car, Clock, Coins, Locate, LucideIcon, Minus, Users } from "lucide-react";

function RideCardProperty({ icon: Icon, label, value, className, rtl }: { icon: LucideIcon, label: React.ReactNode | string, value: React.ReactNode | string, className?: string, rtl?: boolean }) {
	const isRtl = rtl ?? false;
	return <div className={cn("grid gap-x-4 items-center", isRtl ? 'grid-cols-[auto_theme(spacing.6)]' : 'grid-cols-[theme(spacing.6)_auto]', className)}>
		{<Icon className={cn("text-gray-800 size-6", isRtl && 'col-[2/3] row-[1/2]')} />}
		<div className={cn("flex flex-col gap-y-0", isRtl && 'col-[1/2] row-[1/2] text-right')}>
			{
				typeof label === 'string' ?
					<RideCardPropertyLabel>{label}</RideCardPropertyLabel> :
					label
			}
			{
				typeof value === 'string' ?
					<RideCardPropertyValue>{value}</RideCardPropertyValue> :
					value
			}
		</div>
	</div>
}

function RideCardPropertyLabel({ children, className }: { children: React.ReactNode | string, className?: string }) {
	return <div className={cn("text-gray-500 text-sm", className)}>
		{children}
	</div>
}

function RideCardPropertyValue({ children, className }: { children: React.ReactNode | string, className?: string }) {
	return <div className={cn("text-lg font-semibold", className)}>
		{children}
	</div>
}

RideCardProperty.Label = RideCardPropertyLabel;
RideCardProperty.Value = RideCardPropertyValue;

export function RideCard({
	from, to, start_timestamp, price, capacity
}: Ride) {
	return <Card className="grid grid-cols-[1fr_1fr] grid-rows-2 gap-y-4 px-6 py-4">
		<RideCardProperty
			className="col-[1/3] row-[1/2]"
			icon={Locate}
			label={
				<RideCardProperty.Label className="flex flex-row items-center gap-1">
					<Calendar className="size-4" /> {new Date(start_timestamp).toLocaleDateString()}
					<Clock className="size-4 ml-2" /> {new Date(start_timestamp).toLocaleTimeString()}
				</RideCardProperty.Label>
			}
			value={
				<RideCardProperty.Value className="flex flex-row gap-x-2 items-center text-center">
					{toFirstUpperCase(from.name)}
					<ArrowRight />
					{toFirstUpperCase(to.name)}
				</RideCardProperty.Value>
			} />

		<RideCardProperty
			label="Seats"
			value={`${capacity} / ${capacity}`}
			icon={Users} />

		<RideCardProperty
			className="col-[2/3] row-[2/3]"
			label="Price"
			value={`${price} MKD`}
			icon={Coins}
			rtl />
	</Card >
}