"use client";

import { createReviewForPaper } from "@/app/actions/papers";
import type { PaperList } from "@/http/get-paper-list";
import { type ReviewCreateSchema, reviewCreateSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	Button,
	FormControl,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

type ReviewFormProps = {
	paper: PaperList;
	userId: string;
};

export default function ReviewForm({ paper, userId }: ReviewFormProps) {
	const { register, handleSubmit, control } = useForm<ReviewCreateSchema>({
		resolver: zodResolver(reviewCreateSchema),
		defaultValues: {
			value: 0,
			comment: "",
		},
	});

	async function handleCreateReview(data: ReviewCreateSchema) {
		await createReviewForPaper(userId, paper, data);
	}

	return (
		<form onSubmit={handleSubmit(handleCreateReview)}>
			<Stack spacing={2}>
				<Stack>
					<Typography variant="h6">Review this article</Typography>
					<Typography variant="body2" color="GrayText">
						Give a rate from 1 to 5 and write a comment
					</Typography>
				</Stack>
				<Box>
					<FormControl>
						<Select {...register("value")}>
							<MenuItem value={1}>1</MenuItem>
							<MenuItem value={2}>2</MenuItem>
							<MenuItem value={3}>3</MenuItem>
							<MenuItem value={4}>4</MenuItem>
							<MenuItem value={5}>5</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<TextField
					type="textarea"
					label="Leave a comment"
					{...register("comment")}
				/>
				<Box>
					<Button type="submit" variant="contained">
						Send
					</Button>
				</Box>
			</Stack>
		</form>
	);
}
