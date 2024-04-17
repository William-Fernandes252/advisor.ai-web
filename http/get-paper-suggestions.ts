import { createFromAxiosError } from "@/errors/http";
import type { AxiosError, AxiosInstance } from "axios";
import { parseParams } from "./_utils";
import type { GetPaperListParams, PaperList } from "./get-paper-list";

/**
 * Obtém sugestões de artigos.
 *
 * @param params Os parâmetros da busca.
 * @param axios A instância do Axios.
 * @returns A página de sugestões correspondente à busca.
 */
export default async function getPaperSuggestions(
	axios: AxiosInstance,
	params?: GetPaperListParams,
): Promise<PaginatedResponse<PaperList>> {
	try {
		return (
			await axios.get("/papers/suggestions", {
				params: params && parseParams(params),
			})
		).data;
	} catch (error) {
		throw createFromAxiosError(error as AxiosError<ErrorResponse>);
	}
}
