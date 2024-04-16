import { Login, PersonAdd } from "@mui/icons-material";
import {
	Drawer as BaseDrawer,
	Box,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	useTheme,
	ListItemIcon,
} from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";

type DrawerProps = {
	showSignInSection: boolean;
	width: number;
	pages: Page[];
	title: string;
	onClose: () => void;
	open: boolean;
};

export default function Drawer({
	showSignInSection,
	width,
	title,
	onClose,
	open,
	pages,
}: DrawerProps) {
	const {
		palette: {
			primary: { dark: primaryColor },
		},
	} = useTheme();
	return (
		<BaseDrawer
			variant="temporary"
			open={open}
			onClose={onClose}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
			sx={{
				display: { xs: "block", sm: "none" },
				"& .MuiDrawer-paper": {
					boxSizing: "border-box",
					width,
				},
			}}
		>
			<Box onClick={onClose} sx={{ textAlign: "center" }} role="presentation">
				<Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
					<Typography
						variant="h6"
						sx={{ my: 2 }}
						color={primaryColor}
						fontFamily="Victor Mono, monospace"
					>
						{title}
					</Typography>
				</Link>
				<Divider />
				<List>
					{pages.map(({ label, href, icon }) => (
						<DrawerListItem
							key={label}
							label={label}
							href={href}
							icon={icon}
							color={primaryColor}
						/>
					))}
				</List>
				{showSignInSection && (
					<>
						<Divider />
						<List>
							<DrawerListItem
								label="Login"
								onClick={() => signIn()}
								icon={<Login />}
								color={primaryColor}
							/>
							<DrawerListItem
								label="Sign up"
								href="/sign-up"
								icon={<PersonAdd />}
								color={primaryColor}
							/>
						</List>
					</>
				)}
			</Box>
		</BaseDrawer>
	);
}

type DrawerListItemProps = {
	label: string;
	href?: string;
	onClick?: () => void;
	icon: React.ReactNode;
	color: string;
};

function DrawerListItem({
	label,
	href,
	icon,
	color,
	onClick,
}: DrawerListItemProps) {
	return (
		<ListItem disablePadding key={label}>
			{href ? (
				<ListItemButton component={Link} href={href}>
					<ListItemIcon sx={{ color }}>{icon}</ListItemIcon>
					<ListItemText primary={label} />
				</ListItemButton>
			) : (
				<ListItemButton onClick={onClick}>
					<ListItemIcon sx={{ color }}>{icon}</ListItemIcon>
					<ListItemText primary={label} />
				</ListItemButton>
			)}
		</ListItem>
	);
}
