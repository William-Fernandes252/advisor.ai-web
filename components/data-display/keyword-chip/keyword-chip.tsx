import { Chip, type ChipProps } from "@mui/material";

type KeywordChipProps = {
	keyword: string;
} & ChipProps;

export default function KeywordChip({ keyword, ...props }: KeywordChipProps) {
	return (
		<Chip
			size="small"
			variant="outlined"
			color="primary"
			label={keyword}
			{...props}
		/>
	);
}
