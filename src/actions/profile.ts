'use server';

import { env } from "@/env";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const createProfileSchema = z.object({
	profilePicture: z
		.custom<File>()
		.refine((file) => {
			return file !== null;
		}, "Profile picture is required")
		.refine((file) => {
			return file.type.includes('image/');
		}, "File type is not supported"),
	name: z.string(),
});

export async function createProfile(formData: FormData) {
	// const payload = {
	// 	profilePicture: formData.get('profilePicture'),
	// 	name: formData.get('name'),
	// };

	// console.log({ payload });

	// const data = createProfileSchema.parse(payload);

	// const cookieStore = cookies();
	// const supabase = createClient(cookieStore);

	// const { data: { user }, error: userError } = await supabase.auth.getUser();

	// if (userError) {
	// 	throw userError;
	// }

	// if (!user) {
	// 	throw new Error("User not found");
	// }

	// const filename = user.id;

	// const bucket = env.SUPABASE_BUCKETS_PROFILE_PICTURES;
	// const { data: profilePictureData, error: profilePictureError }: {
	// 	data: { path: string, id: string, fullPath: string },
	// 	error: StorageErro,
	// } = await supabase.storage
	// 	.from(bucket)
	// 	.upload(filename, data.profilePicture);

	// supabase.schema('storage'),

	// if (profilePictureError) {
	// 	throw profilePictureError;
	// }

	// if(!profilePictureData.id) {
	// 	throw new Error("Profile picture not uploaded");
	// }

	// const {data: profile, error: profileError} = await supabase.from('profiles').insert({
	// 	picture: profilePictureData,
	// });

	redirect('/dashboard/profile');
}