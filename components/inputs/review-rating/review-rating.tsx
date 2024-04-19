"use client";

import { Rating, type RatingProps, useTheme } from "@mui/material";

type ReviewRatingProps = RatingProps;

export default function ReviewRating(props: ReviewRatingProps) {
	const {
		palette: {
			primary: { dark: primaryColor },
		},
	} = useTheme();
	return (
		<Rating
			{...props}
			sx={{
				"& .MuiRating-iconFilled": {
					color: primaryColor,
				},
			}}
		/>
	);
}
