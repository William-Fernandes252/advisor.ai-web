import { detailPaper, getReviewsForPaper } from "@/app/actions/papers";
import { auth } from "@/auth";
import KeywordChip from "@/components/data-display/keyword-chip";
import PaperReviewsData from "@/components/feedback/paper-reviews-data";
import ReviewCard from "@/components/feedback/review-card";
import ReviewForm from "@/components/forms/review-form";
import Page from "@/components/layout/page";
import {
	Card,
	CardContent,
	CardHeader,
	Divider,
	Link,
	Stack,
	Typography,
} from "@mui/material";
import NextLink from "next/link";

export default async function PaperDetail({
	params,
}: { params: { id: string } }) {
	const session = await auth();
	const paper = await detailPaper(params.id);
	const { results: reviews } = await getReviewsForPaper(params.id);

	return (
		<Page p={6}>
			<Stack>
				<Stack spacing={1}>
					<PaperReviewsData
						average={paper.reviews_average}
						count={paper.reviews_count}
					/>
					<Typography variant="h4">{paper.title}</Typography>
					<Typography variant="subtitle1" color={"GrayText"}>
						{paper.authors.map((author) => author.name).join("; ")}
					</Typography>
					<Stack direction="row" spacing={1} mt="auto">
						{paper.keywords.map((keyword) => (
							<KeywordChip key={keyword} keyword={keyword} />
						))}
					</Stack>
				</Stack>
				<Link
					component={NextLink}
					href={paper.uri}
					variant="body1"
					sx={{ textDecoration: "none", my: 6 }}
				>
					Text completo disponível
				</Link>
				<Stack spacing={1}>
					<Typography variant="h6">Resumo</Typography>
					<Typography variant="body2" textAlign="justify">
						{paper.abstract}
					</Typography>
				</Stack>
				<Divider sx={{ mt: 6, mb: 3 }} />
				<Stack spacing={2} sx={{ mb: 3 }}>
					<Typography variant="h5" mb={1}>
						Avaliações
					</Typography>
					{reviews.map((review) => (
						<ReviewCard review={review} key={review.id} />
					))}
				</Stack>
				<Card>
					<CardHeader title="What did you think about the article?" />
					<CardContent>
						<ReviewForm paper={paper} userId={session?.id || null} />
					</CardContent>
				</Card>
			</Stack>
		</Page>
	);
}
