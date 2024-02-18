'use client';

import { createProfile } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CreateProfile() {
	const supabase = createClient();

	const [profilePictureSrc, setProfilePictureSrc] = useState<string | null>(null);

	// Handle file upload event
	const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			return;
		}

		const file = event.target.files[0];

		// Set file to state
		const blobUrl = URL.createObjectURL(file);
		setProfilePictureSrc(blobUrl);

		// const bucket = "profilePictures"

		// // Call Storage API to upload file
		// const { data, error } = await supabase.storage
		// 	.from(bucket)
		// 	.upload(file.name, file);

		// // Handle error if upload failed
		// if (error) {
		// 	alert('Error uploading file.');
		// 	return;
		// }

		// alert('File uploaded successfully!');
	};

	return (
		<form className="flex-n-center flex-col" action={createProfile}>
			<h1 className="text-center mb-4">Create Profile</h1>
			<Label htmlFor="name" className="mb-2">Profile picture</Label>
			<Button asChild>
				<div className="h-40 w-40 !rounded-full !cursor-pointer mb-2 !p-0">
					<label htmlFor="profilePicture" className="flex-n-center w-full h-full !cursor-pointer">
						{
							profilePictureSrc ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={profilePictureSrc}
									alt="Profile picture"
									className="rounded-full w-full h-full object-cover"
								/>
							) : (
								<Upload className="size-12" />
							)
						}
					</label>
					<input id="profilePicture" name="profilePicture" type="file" className="hidden" onChange={uploadFile} />
				</div>
			</Button>
			<div>
				<Label htmlFor="name">Name</Label>
				<Input id="name" name="name" type="text" placeholder="John Doe" />
			</div>
			<Button type="submit" className="mt-4">Create</Button>
		</form>
	);
}