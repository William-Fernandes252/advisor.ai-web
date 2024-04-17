import { formatISO } from "date-fns";

/**
 * Converte os parâmetros de busca em um objeto de `URLSearchParams`.
 *
 * @param params Os parâmetros de busca.
 * @returns O objeto de `URLSearchParams` correspondente.
 */
export function parseParams(params: Record<string, unknown>): URLSearchParams {
	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value instanceof Date) {
			searchParams.append(key, formatISO(value));
		} else if (Array.isArray(value)) {
			for (const item of value) {
				searchParams.append(key, item);
			}
		} else {
			searchParams.append(key, String(value));
		}
	}

	return searchParams;
}
