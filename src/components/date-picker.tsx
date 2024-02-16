"use client"

import * as React from "react";
import { format } from "date-fns";
import { mk } from "date-fns/locale";

import { cn } from "@/utils/style";
import { Button, ButtonProps } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export type DatePickerProps = Omit<ButtonProps, 'value' | 'onChange'> & {
	value: string | undefined;
	onChange: (val: string | undefined) => void;
}

export default function DatePicker({
	value, onChange, className, ...props
}: DatePickerProps) {
	const dateValue = React.useMemo(() => {
		if (value === undefined) return undefined;
		return new Date(value);
	}, [value]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"ghost"}
					className={cn(
						"min-w-48 justify-start text-left font-normal",
						!dateValue && "text-muted-foreground",
						className
					)}
					{...props}
				>
					{dateValue ? format(dateValue, "P", { locale: mk }) : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={dateValue || undefined}
					onSelect={(date) => void onChange(date?.toISOString())}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
