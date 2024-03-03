'use server';

import { env } from "@/env";
import { joinArray } from "@/utils/general";
import { Database } from "@/utils/supabase/db";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { ZodError, z } from "zod";

const createProfileSchema = z.object({
	profilePicture: z
		.custom<File>()
		.refine((file) => {
			return file !== null && file.size > 0;
		}, "Profile picture is required")
		.refine((file) => {
			return file.type.includes('image/');
		}, "File type is not supported"),
	name: z.string().min(1, "Name is required"),
});

export type CreateProfileResponse = {
	success: true;
	data: Database['public']['Tables']['profiles']['Row']
} | {
	success: false;
	message: string;
};

export async function createProfile(prevState: null | CreateProfileResponse, formData: FormData): Promise<CreateProfileResponse> {
	try {
		const payload = {
			profilePicture: formData.get('profilePicture'),
			name: formData.get('name'),
		};

		const parsedObj = createProfileSchema.safeParse(payload);

		if (parsedObj.success === false) {
			const errors = Object.values(parsedObj.error.flatten().fieldErrors);
			return {
				success: false,
				message: joinArray(errors.flat())
			};
		}

		const { data } = parsedObj;

		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { data: { user }, error: userError } = await supabase.auth.getUser();

		if (userError) {
			return {
				success: false,
				message: `Error fetching user: ${userError.message}`,
			};
		}

		if (!user) {
			return {
				success: false,
				message: `User not found`,
			};
		}

		const filename = user.id;

		const bucket = env.SUPABASE_BUCKETS_PROFILE_PICTURES;
		const { data: profilePictureData, error: profilePictureError } = await supabase.storage
			.from(bucket)
			.upload(filename, data.profilePicture, {
				upsert: true
			});

		if (profilePictureError) {
			return {
				success: false,
				message: `Error uploading profile picture: ${profilePictureError.message}`,
			};
		}

		const { data: { publicUrl: profilePictureUrl } } = supabase.storage
			.from(bucket)
			.getPublicUrl(filename);

		if (!profilePictureUrl) {
			return {
				success: false,
				message: `Error fetching profile picture URL`,
			};
		}

		const { data: profileRes, error: profileError } = await supabase.from('profiles').upsert({
			id: user.id,
			avatar: profilePictureUrl,
			name: data.name,
		}).select();

		if (profileError) {
			return {
				success: false,
				message: `Error creating profile: ${profileError.message}`,
			};
		}

		const profile = profileRes?.[0];

		if (!profile) {
			return {
				success: false,
				message: `Profile not found`,
			};
		}

		return {
			success: true,
			data: profile
		};

	} catch (error) {
		return {
			success: false,
			message: `Error creating profile!`,
		};
	}
}