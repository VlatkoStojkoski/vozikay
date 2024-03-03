'use client';

import { AlertCircle, Ban, CheckCircle, Cross, Loader, Loader2Icon, LoaderIcon, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { createProfile } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/utils/style";

function CreateProfileSubmit() {
	const formStatus = useFormStatus();

	return <Button type="submit" className="mt-4" disabled={formStatus.pending}>
		<Loader2Icon className="size-6 mr-2 animate-spin" />
		Create
	</Button>
}

export default function CreateProfile() {
	const { toast } = useToast();

	const [createProfileState, createProfileAction] = useFormState(createProfile, null);

	const [profilePictureSrc, setProfilePictureSrc] = useState<string | null>(null);

	const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			return;
		}

		const file = event.target.files[0];

		const blobUrl = URL.createObjectURL(file);
		setProfilePictureSrc(blobUrl);
	};

	useEffect(() => {
		if (createProfileState?.success !== undefined) {
			if (createProfileState.success) {
				toast({
					title: <div className="flex flex-row items-center">
						<CheckCircle className="size-6 mr-2" />
						Profile created
					</div>,
					description: 'Your profile has been created successfully',
					className: cn('flex fixed !bottom-0 !right-0 sm:!bottom-4 sm:!right-4 max-w-sm p-4'),
				})
			} else {
				console.log(createProfileState.message);
				toast({
					title: <div className="flex flex-row items-center">
						<AlertCircle className="size-6 mr-2" />
						Profile not created
					</div>,
					description: createProfileState.message,
					variant: 'destructive',
					className: cn('flex fixed !bottom-0 !right-0 sm:!bottom-4 sm:!right-4 max-w-sm p-4')
				})
			}

		}
	}, [createProfileState]);

	return (
		<form className="flex-n-center flex-col" action={createProfileAction}>
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
			<CreateProfileSubmit />
		</form>
	);
}