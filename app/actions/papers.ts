"use server";

import getPaperDetail, { type PaperDetail } from "@/http/get-paper-detail";
import type { GetPaperListParams, PaperList } from "@/http/get-paper-list";
import getPaperList from "@/http/get-paper-list";
import getPaperSuggestions from "@/http/get-paper-suggestions";
import getReviewList from "@/http/get-review-list";
import postReviewCreate from "@/http/post-review-create";
import { axiosInstance } from "@/lib/axios";
import type { ReviewCreateSchema } from "@/lib/schemas";
import { redirect } from "next/navigation";
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
	return await withHttpErrorHandling(getPaperSuggestions)(
		axiosInstance,
		params,
	);
}

/**
 * Lista os artigos.
 *
 * @param params Os parâmetros da busca.
 * @returns A página de sugestões correspondente à busca.
 */
export async function listPapers(params?: GetPaperListParams) {
	return await withHttpErrorHandling(getPaperList)(
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
	return await withHttpErrorHandling(getPaperList)(axiosInstance, {
		ordering: "-score",
	});
}

/**
 * Obtém os detalhes de um artigo.
 *
 * @params id O ID do artigo.
 * @returns Os detalhes do artigo.
 */
export async function detailPaper(id: string): Promise<PaperDetail> {
	return await withHttpErrorHandling(getPaperDetail)(id, axiosInstance);
}

/**
 * Obtém as avaliações de um artigo.
 *
 * @param id O ID do artigo.
 * @returns As avaliações do artigo.
 * @throws {BaseError} Se ocorrer um erro ao obter as avaliações do artigo.
 */
export async function getReviewsForPaper(id: string) {
	return await withHttpErrorHandling(getReviewList)(axiosInstance, {
		paper: id,
	});
}

export async function createReviewForPaper(
	userId: string | null,
	paper: PaperList,
	review: ReviewCreateSchema,
): Promise<never> {
	if (!userId) {
		return redirect("/login/");
	}

	await withHttpErrorHandling(postReviewCreate)(
		{ user: userId, paper: paper.id, ...review },
		axiosInstance,
	);
	return redirect("/");
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
