import {
	getPapersSuggestionsForCurrentUser,
	getPopularPapers,
	type listPapers,
} from "@/app/actions/papers";
import { auth } from "@/auth";
import PaperCard from "@/components/feedback/paper-card";
import Page from "@/components/layout/page";
import { Search } from "@mui/icons-material";
import {
	Box,
	Divider,
	Grid,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import type { Session } from "next-auth";

export default async function Home() {
	const { results: suggestions } = await getPapersSuggestionsForCurrentUser();
	const { results: popular } = await getPopularPapers();
	const { user } = (await auth()) as Session;
	return (
		<Page flex={1} sx={{ p: 0 }}>
			<Box p={3} mx={6}>
				<Typography variant="h3" color="primary.main" p={3}>
					Welcome back, {user.name}
				</Typography>
				<form action="/papers" method="GET">
					<TextField
						type="search"
						name="search"
						label="Search"
						helperText="Search for articles by title, content or field of study"
						InputProps={{
							endAdornment: (
								<InputAdornment position="start" variant="standard">
									<Search />
								</InputAdornment>
							),
						}}
					/>
				</form>
			</Box>
			<Stack p={6} spacing={4}>
				<PapersSection title="Suggested for you" papers={suggestions} />
				<PapersSection title="Popular" papers={popular} />
			</Stack>
		</Page>
	);
}

type PapersSectionProps = {
	title: string;
	papers: Awaited<ReturnType<typeof listPapers>>["results"];
};

function PapersSection({ title, papers }: PapersSectionProps) {
	return (
		<Box>
			<Typography variant="h4" my={1}>
				{title}
			</Typography>
			<Divider sx={{ my: 2 }} />
			<Grid container spacing={2}>
				{papers.map((paper) => (
					<Grid item xs={12} sm={6} md={4}>
						<Paper elevation={4}>
							<PaperCard paper={paper} />
						</Paper>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
