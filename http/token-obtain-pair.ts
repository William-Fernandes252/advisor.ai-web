import { createFromAxiosError } from "@/errors/http";
import type { Axios, AxiosError } from "axios";

type TokenObtainPairPayload = {
	/**
	 * Email do usuário.
	 */
	email: string;

	/**
	 * Senha do usuário.
	 */
	password: string;
};

/**
 * Obtém um par de tokens de acesso e atualização.
 *
 * @param data Dados de autenticação.
 * @param axios Instância do Axios.
 * @returns Tokens de acesso e atualização.
 * @throws {NotFoundError} Se o recurso solicitado não foi encontrado.
 */
export default async function tokenObtainPair(
	data: TokenObtainPairPayload,
	axios: Axios,
): Promise<{ access: string; refresh: string }> {
	try {
		return (await axios.post("/token/", data)).data;
	} catch (error) {
		throw createFromAxiosError(error as AxiosError<ErrorResponse>);
	}
}
