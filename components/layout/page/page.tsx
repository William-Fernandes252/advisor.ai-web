import { Box } from "@mui/material";

export default function Page({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<Box component="main" sx={{ p: 3 }}>
			{children}
		</Box>
	);
}
