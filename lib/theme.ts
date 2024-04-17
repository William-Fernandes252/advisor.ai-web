"use client";

import { createTheme } from "@mui/material";
import { Inter, Victor_Mono } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	display: "swap",
});

const victorMono = Victor_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	display: "swap",
});

export default createTheme({
	palette: {
		primary: {
			main: "#3E5BA6",
		},
		secondary: {
			main: "##a6893e",
		},
		success: {
			main: "##3e90a6 ",
		},
	},
	components: {
		MuiAlert: {
			defaultProps: {
				variant: "outlined",
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: "outlined",
				size: "small",
				fullWidth: true,
			},
		},
	},
	typography: {
		fontFamily: [inter.style.fontFamily, victorMono.style.fontFamily].join(","),
	},
});
