import type { AxiosError } from "axios";
import { BaseError } from ".";

export class HttpError extends BaseError {
	readonly status: number;

	constructor(options: {
		message: string;
		action: string;
		cause?: unknown;
		status: number;
	}) {
		super(options);
		this.status = options.status;
	}
}

export class NotFoundError extends HttpError {
	constructor(cause?: unknown) {
		super({
			message: "O recurso solicitado não foi encontrado.",
			action: "Verifique a URL e tente novamente.",
			cause,
			status: 404,
		});
	}
}

export class ValidationError extends HttpError {
	constructor(
		cause?: unknown,
		readonly fieldErrors?: Record<string, string>,
	) {
		super({
			message: "Ocorreu um erro de validação.",
			action: "Corrija os erros e tente novamente.",
			cause,
			status: 400,
		});
	}
}

export class ServerError extends HttpError {
	constructor(cause?: unknown) {
		super({
			message: "Ocorreu um erro no servidor.",
			action: "Tente novamente mais tarde.",
			status: 500,
			cause,
		});
	}
}

export class UnauthorizedError extends HttpError {
	constructor(cause?: unknown) {
		super({
			message: "Acesso negado.",
			action: "Verifique suas credenciais e tente novamente.",
			status: 401,
			cause,
		});
	}
}

export class SessionExpiredError extends HttpError {
	constructor(cause?: unknown) {
		super({
			message: "Sessão expirada.",
			action: "Verifique suas credenciais e tente novamente.",
			status: 401,
			cause,
		});
	}
}

export class ForbiddenError extends HttpError {
	constructor(cause?: unknown) {
		super({
			message: "Acesso negado.",
			action: "Você não tem permissão para realizar esta ação.",
			status: 403,
			cause,
		});
	}
}

export class NetworkError extends BaseError {
	constructor(cause?: unknown) {
		super({
			message: "Ocorreu um erro durante a comunicação com o servidor.",
			action: "Verifique sua conexão e tente novamente.",
			cause,
		});
	}
}

export class ErrorFactory {}

export function createFromAxiosError(
	axiosError: AxiosError<ErrorResponse>,
): BaseError {
	if (axiosError.response) {
		switch (axiosError.response.status) {
			case 400:
			case 422:
				return new ValidationError(
					axiosError,
					axiosError.response.data as Record<string, string>,
				);
			case 401:
				return new UnauthorizedError(axiosError);
			case 403:
				return new ForbiddenError(axiosError);
			case 404:
				return new NotFoundError(axiosError);
			case 500:
				return new ServerError(axiosError);
		}
	}
	return new NetworkError(axiosError);
}
