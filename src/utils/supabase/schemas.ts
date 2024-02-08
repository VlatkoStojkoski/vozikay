import { z } from "zod";

export const newRideFormSchema = z.object({
	from: z.coerce.number(),
	to: z.coerce.number(),
	start_timestamp: z.string(),
	capacity: z.coerce.number(),
	total_price: z.coerce.number().min(50),
})