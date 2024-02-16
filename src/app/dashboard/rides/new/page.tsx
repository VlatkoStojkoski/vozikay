import * as React from "react";
import Image from "next/image";

import PublishRidesForm from "@/components/publish-ride-form";

export default function NewRidePage() {
	return (
		<main className="relative min-w-full -translate-y-navbar min-h-[calc(100dvh-3rem-theme(spacing.3)*2-theme(spacing.6))] bg-[url(/assets/img/bg-1.jpg)] bg-center bg-cover px-3 pt-24 flex-n-center">
			<div className="relative z-10 pt-16 backdrop-blur-sm rounded-lg">
				<div className="absolute top-0 left-0 bg-background w-full h-full -z-10 rounded-lg"></div>
				<div className="absolute top-0 left-1/2 transform -translate-y-2/3 -translate-x-1/2 w-full max-w-[100vw] max-h-52 aspect-[1191/569]">
					<Image
						src="/assets/img/car-illustration.png"
						alt=""
						fill
						style={{ objectFit: "cover" }}
						quality={100}
					/>
				</div>

				<h1 className="text-center mb-4">Publish New Ride</h1>

				<PublishRidesForm />
			</div>

			<div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-background"></div>
		</main>
	);
}