import { Search } from "@mui/icons-material";
import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";

type PaperSearchFieldProps = {} & TextFieldProps;

export default function PaperSearchForm(props: PaperSearchFieldProps) {
	return (
		<form action="/" method="GET">
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
				{...props}
			/>
		</form>
	);
}
