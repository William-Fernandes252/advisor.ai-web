type PaginatedResponse<T> = {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
};

type ErrorResponse = {
	detail: string;
};
