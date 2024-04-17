"use client";

import { register as createUser } from "@/app/actions/users";
import PhoneNumberInput from "@/components/inputs/phone-number-input";
import Page from "@/components/layout/page";
import { type SignUpSchema, signUpSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
	Card,
	CardContent,
	Grid,
	Stack,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import { useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";

export default function SignUp() {
	const [errors, setErrors] = useState<FieldErrors<SignUpSchema> | null>(null);
	const { handleSubmit, register } = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
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
							Create an account
						</Typography>
					</Stack>
					<form onSubmit={handleSubmit((data) => createUser(data), setErrors)}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									label="Name"
									{...register("name")}
									error={!!errors && "name" in errors}
									helperText={errors?.name?.message}
								/>
							</Grid>
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
							<Grid item xs={12}>
								<TextField
									label="Confirm password"
									type="password"
									{...register("confirmPassword")}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Phone number"
									InputProps={{
										// @ts-ignore
										inputComponent: PhoneNumberInput,
									}}
									{...register("phone_number")}
									error={!!errors && "phone_number" in errors}
									helperText={errors?.phone_number?.message}
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
							Register
						</LoadingButton>
					</form>
				</CardContent>
			</Card>
		</Page>
	);
}
