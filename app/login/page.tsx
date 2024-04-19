"use client";

import Page from "@/components/layout/page";
import { type SignInSchema, signInSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
	Alert,
	Card,
	CardContent,
	Grid,
	Stack,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import { useSearchParams } from "next/navigation";

import { login } from "@/app/actions/users";
import { useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";

export default function SignUp() {
	const searchParams = useSearchParams();
	const [errors, setErrors] = useState<FieldErrors<SignInSchema> | null>(null);
	const { handleSubmit, register } = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
	});
	const {
		palette: {
			primary: { dark: primaryColor },
		},
	} = useTheme();

	return (
		<Page
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={{ p: 3, height: "100%" }}
		>
			<Card
				sx={{ minWidth: 200, maxWidth: 500, border: "none" }}
				variant="outlined"
			>
				<CardContent>
					<Stack spacing={2} justifyContent="center" alignItems="center">
						<Typography
							variant="h4"
							sx={{ textAlign: "center" }}
							color={primaryColor}
							fontFamily="Victor Mono, monospace"
						>
							advisor.ai
						</Typography>
						<Typography variant="body2" sx={{ textAlign: "center", p: 1 }}>
							Sign in
						</Typography>
					</Stack>
					<form onSubmit={handleSubmit((data) => login(data), setErrors)}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									label="Email"
									{...register("email")}
									error={!!errors && "email" in errors}
									helperText={errors?.email?.message}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Password"
									type="password"
									{...register("password")}
								/>
							</Grid>
						</Grid>
						<LoadingButton
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
							sx={{ mt: 2 }}
						>
							Login
						</LoadingButton>
						{searchParams.get("error") && (
							<Alert severity="error" sx={{ mt: 2 }}>
								Invalid email or password.
							</Alert>
						)}
					</form>
				</CardContent>
			</Card>
		</Page>
	);
}
