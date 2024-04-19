"use client";

import { BaseError } from "@/errors";
import { Sick } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

export default function ErrorBoundary({
	error,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	if (process.env.NODE_ENV === "development") {
		console.error(error);
	}

	return (
		<Grid container sx={{ height: "100vh" }}>
			<Grid
				item
				xs={12}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Grid
					container
					sx={{ p: 3 }}
					spacing={1}
					direction="column"
					alignContent="center"
					alignItems="center"
				>
					<Grid item>
						<Typography
							variant="h2"
							color="error"
							sx={{ textAlign: "center", mb: 2 }}
						>
							Error <Sick fontSize="large" />
						</Typography>
					</Grid>
					{error instanceof Error && (
						<Grid item>
							<Typography variant="body1" sx={{ textAlign: "center" }}>
								{(error as Error).message}
							</Typography>
						</Grid>
					)}
					{error instanceof BaseError && (
						<Grid item>
							<Typography variant="caption" sx={{ textAlign: "center" }}>
								{error.action}
							</Typography>
						</Grid>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
}
