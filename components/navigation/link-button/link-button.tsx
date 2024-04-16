import { Button, type ButtonProps } from "@mui/material";
import Link from "next/link";

type Props = Omit<ButtonProps<typeof Link>, "component">;

export default function LinkButton({ children, ...props }: Props) {
	return (
		<Button {...props} component={Link}>
			{children}
		</Button>
	);
}
