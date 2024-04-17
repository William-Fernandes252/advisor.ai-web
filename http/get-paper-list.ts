import { createFromAxiosError } from "@/errors/http";
import type { AxiosError, AxiosInstance } from "axios";
import { parseParams } from "./_utils";

export type GetPaperListParams = Partial<{
	/**
	 * O índice do primeiro item a ser retornado.
	 */
	offset: number;

	/**
	 * O número máximo de itens a serem retornados.
	 */
	limit: number;

	/**
	 * O país de origem do artigo.
	 */
	country: string;

	/**
	 * O campo pelo qual a lista de artigos será ordenada.
	 *
	 * Para ordenar de forma decrescente, adicione um hífen (-) antes do campo.
	 */
	ordering: keyof PaperList | "score" | `-${keyof PaperList}` | "-score";

	/**
	 * Palavras-chave que devem estar presentes no artigo.
	 */
	keywords: string[];

	/**
	 * Buscar por autores.
	 */
	authors: string[];

	/**
	 * Data base de publicação do artigo.
	 */
	published_after: Date;

	/**
	 * Data limite de publicação do artigo.
	 */
	published_before: Date;

	/**
	 * Busca pelo conteúdo do artigo.
	 */
	search: string;

	/**
	 * Busca pelo título do artigo.
	 */
	title: string;
}>;

export type Location = {
	/**
	 * O país de origem do artigo.
	 */
	country: string;

	/**
	 * A cidade de origem do artigo.
	 */
	city: string;

	/**
	 * O estado de origem do artigo.
	 */
	state: string;
};

export type Author = {
	/**
	 * O nome do autor.
	 */
	name: string;

	/**
	 * O ID do autor.
	 */
	id: string;

	/**
	 * A fonte de dados do autor.
	 */
	uri: string;
};

export type PaperList = {
	/**
	 * O ID do artigo.
	 */
	id: number;

	/**
	 * O título do artigo.
	 */
	title: string;

	/**
	 * O resumo do artigo.
	 */
	abstract: string;

	/**
	 * A lista de autores do artigo.
	 */
	authors: Author[];

	/**
	 * As palavras-chave do artigo.
	 */
	keywords: string[];

	/**
	 * A localização do artigo.
	 */
	location: Location;

	/**
	 * A data de publicação do artigo.
	 */
	published: string;

	/**
	 * O DOI do artigo.
	 */
	doi: string;

	/**
	 * O link para o artigo.
	 */
	uri: string;

	/**
	 * O link para o PDF do artigo.
	 */
	pdf: string;

	/**
	 * O número de avaliações do artigo.
	 */
	reviews_count: number;

	/**
	 * A média das avaliações do artigo.
	 */
	reviews_average: number;
};

/**
 * Lista artigos.
 *
 * @param params Os parâmetros da busca.
 * @param axios A instância do Axios.
 * @returns A página de sugestões correspondente à busca.
 */
export default async function getPaperList(
	axios: AxiosInstance,
	params?: GetPaperListParams,
): Promise<PaginatedResponse<PaperList>> {
	try {
		return (
			await axios.get("/papers/", {
				params: params && parseParams(params),
			})
		).data;
	} catch (error) {
		throw createFromAxiosError(error as AxiosError<ErrorResponse>);
	}
}
