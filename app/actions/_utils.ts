import { UnauthorizedError } from "@/errors/http";
import { redirect } from "next/navigation";

/**
 * Adiciona tratamento de erro HTTP a uma função.
 *
 * @param fn Função que pode lançar um erro HTTP.
 * @returns Função que trata erros HTTP.
 */
export function withHttpErrorHandling<A extends unknown[], R>(
	fn: (...args: A) => R,
): (...args: A) => Promise<Awaited<R>> {
	async function wrapper(...args: A): Promise<Awaited<R>> {
		try {
			return await fn(...args);
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				redirect("/login");
			}
			throw error;
		}
	}

	return wrapper;
}
