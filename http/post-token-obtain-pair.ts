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

type TokenObtainPairResponse = {
	/**
	 * Token de acesso.
	 */
	access: string;

	/**
	 * Token de atualização.
	 */
	refresh: string;
};

/**
 * Obtém um par de tokens de acesso e atualização.
 *
 * @param data Dados de autenticação.
 * @param axios Instância do Axios.
 * @returns Tokens de acesso e atualização.
 * @throws {NotFoundError} Se o recurso solicitado não foi encontrado.
 */
export default async function postTokenObtainPair(
	data: TokenObtainPairPayload,
	axios: Axios,
): Promise<TokenObtainPairResponse> {
	try {
		return (await axios.post("/token/", data)).data;
	} catch (error) {
		throw createFromAxiosError(error as AxiosError<ErrorResponse>);
	}
}
