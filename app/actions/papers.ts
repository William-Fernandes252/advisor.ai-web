"use server";

import type { GetPaperListParams } from "@/http/get-paper-list";
import getPaperList from "@/http/get-paper-list";
import getPaperSuggestions from "@/http/get-paper-suggestions";
import { axiosInstance } from "@/lib/axios";
import { withHttpErrorHandling } from "./_utils";

/**
 * Obtém sugestões de artigos para o usuário atual.
 *
 * @param params Os parâmetros da busca.
 * @returns A página de sugestões correspondente à busca.
 */
export async function getPapersSuggestionsForCurrentUser(
	params?: GetPaperListParams,
) {
	return withHttpErrorHandling(getPaperSuggestions)(axiosInstance, params);
}

/**
 * Lista os artigos.
 *
 * @param params Os parâmetros da busca.
 * @returns A página de sugestões correspondente à busca.
 */
export async function listPapers(params?: GetPaperListParams) {
	return withHttpErrorHandling(getPaperList)(
		axiosInstance,
		addDefaults(params),
	);
}

/**
 * Lista os artigos.
 *
 * @param params Os parâmetros da busca.
 * @returns A página de sugestões correspondente à busca.
 */
export async function getPopularPapers() {
	return withHttpErrorHandling(getPaperList)(axiosInstance, {
		ordering: "-score",
	});
}

/**
 * Adiciona valores padrão aos parâmetros de busca.
 *
 * @param params Os parâmetros de busca.
 * @returns Os parâmetros de busca com valores padrão.
 */
function addDefaults(params: GetPaperListParams = {}): GetPaperListParams {
	const paramsWithDefaults: GetPaperListParams = {
		offset: 0,
		limit: 15,
		...params,
	};

	if (!paramsWithDefaults.search && !paramsWithDefaults.ordering) {
		paramsWithDefaults.ordering = "-score";
	}

	return paramsWithDefaults;
}
