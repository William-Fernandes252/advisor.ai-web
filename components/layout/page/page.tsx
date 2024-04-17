import { Box, type BoxProps } from "@mui/material";

export default function Page({
	children,
	...props
}: Readonly<Omit<BoxProps, "component">>) {
	return (
		<Box component="main" sx={{ p: 3, m: 0 }} {...props}>
			{children}
		</Box>
	);
}
