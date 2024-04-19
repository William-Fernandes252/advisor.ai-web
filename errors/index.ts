export class BaseError extends Error {
	readonly action: string;
	readonly cause?: unknown;

	constructor(options: {
		message: string;
		cause?: unknown;
		action?: string;
	}) {
		super(options.message);
		this.cause = options.cause;
		this.action =
			options.action ??
			"Ocorreu um erro inesperado. Tente novamente mais tarde.";
	}
}
