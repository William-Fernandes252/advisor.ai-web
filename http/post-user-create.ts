import { BaseError } from "@/errors";
import { createFromAxiosError } from "@/errors/http";
import type { Axios, AxiosError } from "axios";

type CreateUserPayload = {
	/**
	 * Email do usuário.
	 */
	email: string;

	/**
	 * Senha do usuário.
	 */
	password: string;

	/**
	 * Nome do usuário.
	 */
	name: string;

	/**
	 * Número de telefone do usuário.
	 */
	phone_number: string;
};

type PostUserCreateResponse = {
	/**
	 * ID do usuário.
	 */
	id: number;

	/**
	 * Email do usuário.
	 */
	email: string;

	/**
	 * Nome do usuário.
	 */
	name: string;

	/**
	 * Número de telefone do usuário.
	 */
	phone_number: string;

	/**
	 * Data de criação do usuário.
	 */
	date_joined: string;

	/**
	 * Grupos do usuário.
	 */
	groups: string[];
};

/**
 * Cria um usuário utilizando a API.
 *
 * @param data Dados do usuário.
 * @param axios Instância do Axios.
 * @returns Usuário criado.
 * @throws {BaseError} Se ocorrer um erro de validação.
 */
export default async function postUserCreate(
	data: CreateUserPayload,
	axios: Axios,
): Promise<PostUserCreateResponse> {
	try {
		return (await axios.post("/users/", data)).data;
	} catch (error) {
		throw createFromAxiosError(error as AxiosError<ErrorResponse>);
	}
}
