'use client';

import { createClient } from "@/utils/supabase/client";
import { Button, ButtonProps } from "./ui/button";
import { useState } from "react";

export interface AuthButtonProps extends ButtonProps {
	label?: string;
}

export function SignInButton({ label, ...props }: AuthButtonProps) {
	const [isLoading, setIsLoading] = useState(false);

	const hSignIn = async () => {
		setIsLoading(true);
		const supabase = createClient();
		await supabase.auth.signInWithOAuth({
			provider: 'google'
		});
		setIsLoading(false);
	}

	return (
		<Button onClick={hSignIn} disabled={isLoading} {...props}>
			{label ?? "Get Started"}
		</Button>
	);
}
