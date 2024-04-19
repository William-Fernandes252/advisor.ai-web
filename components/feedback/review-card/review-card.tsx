import UserAvatar from "@/components/data-display/user-avatar";
import ReviewRating from "@/components/inputs/review-rating";
import type { ReviewList } from "@/http/get-review-list";
import { AccountCircleOutlined } from "@mui/icons-material";
import {
	Card,
	CardContent,
	type CardProps,
	Stack,
	Typography,
} from "@mui/material";

type ReviewCardProps = {
	review: ReviewList;
} & CardProps;

export default function ReviewCard({ review, ...props }: ReviewCardProps) {
	return (
		<Card {...props}>
			<CardContent>
				<Stack direction="row" spacing={2} alignItems="center" mb={2}>
					<UserAvatar alt={String(review.by)}>
						<AccountCircleOutlined />
					</UserAvatar>
					<Typography fontSize={18}>{review.by}</Typography>
				</Stack>
				<Stack direction="row" spacing={1} mb={2} alignItems="center">
					<Typography variant="body1" sx={{ fontWeight: "bold" }}>
						{`${review.value}.0`}
					</Typography>
					<ReviewRating value={review.value} readOnly />
				</Stack>
				<Typography variant="body2">{review.comment}</Typography>
			</CardContent>
		</Card>
	);
}
