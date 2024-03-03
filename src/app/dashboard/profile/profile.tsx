import { Database } from "@/utils/supabase/db"

export type ProfileProps = {
	profile: Database['public']['Tables']['profiles']['Row'];
}

export default async function Profile({ profile }: ProfileProps) {
	return <div className="flex-n-center flex-col gap-y-3 py-6">
		<div className="h-40 w-40 !rounded-full !cursor-pointer mb-2 !p-0 border-[3px] border-primary">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={profile.avatar}
				alt="Profile picture"
				className="rounded-full w-full h-full object-cover"
			/>
		</div>
		<h2 className="text-center text-3xl font-semibold">{profile.name}</h2>
	</div>
}