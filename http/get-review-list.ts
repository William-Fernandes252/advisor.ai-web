import { createFromAxiosError } from "@/errors/http";
import type { AxiosError, AxiosInstance } from "axios";
import { parseParams } from "./_utils";

export type GetReviewListParams = Partial<
	{
		/**
		 * Nota dos artigos.
		 */
		value: number;

		/**
		 * Buscar por artigo.
		 */
		paper: string;
	} & LimitOffsetPaginationParams &
		OrderingParams<"value" | "-value">
>;

export type ReviewList = {
	/**
	 * O ID da avaliação.
	 */
	id: string;

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

	/**
	 * O nome do usuário que fez a avaliação.
	 */
	by: string;
};

/**
 * Obtém a lista de avaliações.
 *
 * @param axios O cliente Axios.
 * @param params Os parâmetros da busca.
 * @returns A lista de avaliações.
 */
export default async function getReviewList(
	axios: AxiosInstance,
	params: GetReviewListParams,
): Promise<PaginatedResponse<ReviewList>> {
	try {
		return (await axios.get("/reviews/", { params: parseParams(params) })).data;
	} catch (error) {
		throw createFromAxiosError(error as AxiosError<ErrorResponse>);
	}
}
