"use client";

import { AccountCircleOutlined } from "@mui/icons-material";
import { Avatar, type AvatarProps, useTheme } from "@mui/material";

type UserAvatarProps = AvatarProps;

export default function UserAvatar(props: UserAvatarProps) {
	const {
		palette: {
			primary: { dark: primaryColor },
		},
	} = useTheme();
	return (
		<Avatar sx={{ bgcolor: primaryColor }} {...props}>
			<AccountCircleOutlined />
		</Avatar>
	);
}
