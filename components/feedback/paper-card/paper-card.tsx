import type { listPapers } from "@/app/actions/papers";
import { getShortName } from "@/lib/string";
import { StarOutline } from "@mui/icons-material";
import {
	Card,
	CardActionArea,
	CardContent,
	type CardProps,
	Chip,
	Stack,
	Typography,
} from "@mui/material";

type PaperCardProps = {
	paper: Awaited<ReturnType<typeof listPapers>>["results"][0];
} & CardProps;

export default function PaperCard({ paper, ...props }: PaperCardProps) {
	return (
		<Card variant="outlined" sx={{ border: "none" }} {...props}>
			<CardActionArea
				sx={{
					display: "flex",
					alignItems: "start",
					justifyContent: "start",
					width: "100%",
				}}
				href={`/papers/${paper.id}`}
			>
				<CardContent
					sx={{
						minHeight: 144,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Stack direction="row" alignItems="center" spacing={0.5}>
						<StarOutline sx={{ fontSize: 15 }} />
						<Typography variant="caption" textAlign="center">
							{paper.reviews_average} ({paper.reviews_count})
						</Typography>
					</Stack>
					<Typography
						variant="h6"
						sx={{
							display: "-webkit-box",
							overflow: "hidden",
							WebkitBoxOrient: "vertical",
							WebkitLineClamp: 2,
						}}
					>
						{paper.title}
					</Typography>
					<Typography variant="subtitle1" mb={1}>
						{getShortName(paper.authors[0].name)}
					</Typography>
					<Stack direction="row" spacing={1} mt="auto">
						{paper.keywords.map((keyword) => (
							<Chip
								size="small"
								variant="outlined"
								color="primary"
								label={keyword}
							/>
						))}
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
