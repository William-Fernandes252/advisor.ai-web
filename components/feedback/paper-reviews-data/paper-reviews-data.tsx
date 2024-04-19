import { StarOutline } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

type PaperReviewsDataProps = {
	average: number;
	count: number;
};

export default function PaperReviewsData({
	average,
	count,
}: PaperReviewsDataProps) {
	return (
		<Stack direction="row" alignItems="center" spacing={0.5}>
			<StarOutline sx={{ fontSize: 15 }} />
			<Typography variant="caption" textAlign="center">
				{average} ({count})
			</Typography>
		</Stack>
	);
}
