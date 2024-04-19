import RootLayout from "@/app/layout";
import { auth } from "@/auth";
import AppBar from "@/components/feedback/app-bar";
import type { User } from "next-auth";

export { metadata } from "@/app/layout";

export default async function PagesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<RootLayout>
			<AppBar user={session?.user as User} />
			{children}
		</RootLayout>
	);
}
