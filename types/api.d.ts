type PaginatedResponse<T> = {
	/**
	 * Número total de itens.
	 */
	count: number;

	/**
	 * URL para a próxima página.
	 */
	next: string | null;

	/**
	 * URL para a página anterior.
	 */
	previous: string | null;

	/**
	 * Resultados da página atual.
	 */
	results: T[];
};

type OrderingParams<K> = {
	/**
	 * Ordenação dos itens.
	 */
	ordering?: K;
};

type LimitOffsetPaginationParams = {
	/**
	 * Índice do primeiro item.
	 */
	offset?: number;

	/**
	 * Número máximo de itens.
	 */
	limit?: number;
};

type ErrorResponse<T extends Record<string, unknown> = null> = T extends null
	? {
			/**
			 * Detalhes do erro.
			 */
			detail: string;
		}
	: {
			[key: keyof T]: string[];
		};
