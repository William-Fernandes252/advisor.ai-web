import { listPapers } from "@/app/actions/papers";
import PaperCard from "@/components/feedback/paper-card";
import PaperSearchForm from "@/components/forms/paper-search-form";
import Page from "@/components/layout/page";
import { Box, Paper, Stack, Typography } from "@mui/material";

export default async function Papers({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}) {
	const { results } = await listPapers(searchParams);
	return (
		<Page flex={1}>
			<Box py={3} mx={3}>
				<Typography variant="h5" mb={1}>
					{searchParams.search
						? `Search results for "${searchParams.search}"`
						: "All papers"}
				</Typography>
				<PaperSearchForm defaultValue={searchParams.search} />
			</Box>
			<Stack px={3} pb={3} spacing={2}>
				{results.map((paper) => (
					<Paper elevation={4}>
						<PaperCard paper={paper} />
					</Paper>
				))}
			</Stack>
		</Page>
	);
}
