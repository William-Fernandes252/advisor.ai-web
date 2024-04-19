import { createFromAxiosError } from "@/errors/http";
import type { AxiosError, AxiosInstance } from "axios";

type ReviewCreatePayload = {
	/**
	 * O ID do artigo avaliado.
	 */
	paper: string;

	/**
	 * O ID do usuário que fez a avaliação.
	 */
	user: string;

	/**
	 * A nota da avaliação.
	 */
	value: number;

	/**
	 * O comentário da avaliação.
	 */
	comment: string;
};

export default async function postReviewCreate(
	payload: ReviewCreatePayload,
	axios: AxiosInstance,
) {
	try {
		return (await axios.post("/reviews/", payload)).data;
	} catch (error) {
		throw createFromAxiosError(error as AxiosError<ErrorResponse>);
	}
}
