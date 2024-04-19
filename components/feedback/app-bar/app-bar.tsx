"use client";

import Drawer from "@/components/navigation/drawer";
import LinkButton from "@/components/navigation/link-button";
import {
	AccountCircleOutlined,
	LibraryBooks,
	Login,
	LogoutOutlined,
	PersonAdd,
	SpaceDashboard,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
	Avatar,
	Button,
	ListItemIcon,
	Menu,
	MenuItem,
	useTheme,
} from "@mui/material";
import BaseAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import type { User } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const drawerWidth = 240;

type AppBarProps = {
	user?: User;
};

const pages: Page[] = [
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: <SpaceDashboard />,
	},
	{
		label: "Papers",
		href: "/",
		icon: <LibraryBooks />,
	},
];
const title = "advisor.ai";

export default function AppBar({ user }: AppBarProps) {
	const titleTypography = (
		<>
			<Typography
				variant="h6"
				component={Link}
				noWrap
				href="/"
				sx={{
					mr: 2,
					textDecoration: "none",
					color: "inherit",
					display: { xs: "none", sm: "block" },
					fontFamily: "Victor Mono, monospace",
					fontWeight: "bold",
				}}
			>
				{title}
			</Typography>
			<Typography
				variant="h6"
				component={Link}
				noWrap
				href="/"
				flexGrow={1}
				sx={{
					mr: 2,
					textDecoration: "none",
					display: { xs: "block", sm: "none" },
					color: "inherit",
					fontFamily: "Victor Mono, monospace",
					fontWeight: "bold",
				}}
			>
				advisor.ai
			</Typography>
		</>
	);

	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const showUserMenu = Boolean(menuAnchorEl);
	const userAvatar = (
		<IconButton
			id="account-button"
			onClick={handleClick}
			aria-haspopup="true"
			aria-controls={showUserMenu ? "account-menu" : undefined}
			aria-expanded={showUserMenu ? "true" : undefined}
		>
			<Avatar
				alt={String(user?.name)}
				sx={{ bgcolor: theme.palette.primary.dark }}
			>
				{user?.image && <AccountCircleOutlined />}
			</Avatar>
		</IconButton>
	);

	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		setMenuAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setMenuAnchorEl(null);
	}

	function handleDrawerToggle() {
		setMobileOpen(!mobileOpen);
	}

	function handleLogout() {
		setMenuAnchorEl(null);
		signOut();
	}

	return (
		<>
			<BaseAppBar component="nav">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					{titleTypography}
					<Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
						{pages.map(({ label, href }) => (
							<LinkButton
								key={href}
								onClick={handleClose}
								sx={{ my: 2, color: "white" }}
								href={href}
							>
								{label}
							</LinkButton>
						))}
					</Box>
					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						{user ? (
							userAvatar
						) : (
							<>
								<LinkButton
									sx={{ color: "white" }}
									href="sign-up"
									startIcon={<PersonAdd />}
								>
									Sign Up
								</LinkButton>
								<Button
									sx={{ color: "white" }}
									onClick={() => signIn()}
									startIcon={<Login />}
								>
									Login
								</Button>
							</>
						)}
					</Box>
					{user && (
						<Box sx={{ display: { xs: "block", sm: "none" } }}>
							{userAvatar}
						</Box>
					)}
					<Menu
						id="account-menu"
						anchorEl={menuAnchorEl}
						open={showUserMenu}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "account-button",
						}}
					>
						<MenuItem disabled>{user?.email}</MenuItem>
						<MenuItem onClick={handleLogout}>
							<ListItemIcon>
								<LogoutOutlined fontSize="small" />
							</ListItemIcon>
							<ListItemText>Logout</ListItemText>
						</MenuItem>
					</Menu>
				</Toolbar>
			</BaseAppBar>
			<nav>
				<Drawer
					showSignInSection={!user}
					width={drawerWidth}
					title={"advisor.ai"}
					open={mobileOpen}
					pages={pages}
					onClose={handleDrawerToggle}
				/>
			</nav>
			<Toolbar />
		</>
	);
}
