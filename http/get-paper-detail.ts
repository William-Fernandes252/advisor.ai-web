import { BaseError } from "@/errors";
import { createFromAxiosError } from "@/errors/http";
import type { AxiosError, AxiosInstance } from "axios";
import type { PaperList } from "./get-paper-list";

export type PaperDetail = PaperList & {
	/**
	 * O resumo do artigo.
	 */
	abstract: string;
};

/**
 * Obtém os detalhes de um artigo.
 *
 * @param id O ID do artigo.
 * @param axios O cliente Axios.
 * @returns Os detalhes do artigo.
 * @throws {BaseError} Se ocorrer um erro ao obter os detalhes do artigo.
 */
export default async function getPaperDetail(
	id: string,
	axios: AxiosInstance,
): Promise<PaperDetail> {
	try {
		return (await axios.get(`/papers/${id}`)).data;
	} catch (error) {
		throw createFromAxiosError(error as AxiosError<ErrorResponse>);
	}
}
