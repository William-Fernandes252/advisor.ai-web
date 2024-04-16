import { auth } from "@/auth";
import AppBar from "@/components/feedback/app-bar";
import theme from "@/lib/theme";
import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import type { User } from "next-auth";

export const metadata: Metadata = {
	title: "advisor.ai",
	description:
		"Article search and recommendation platform focused on promoting collaboration between researchers using AI",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>
						<Container maxWidth="xl">
							<AppBar user={session?.user as User} />
							{children}
						</Container>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
