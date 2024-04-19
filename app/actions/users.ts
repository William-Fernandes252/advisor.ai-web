"use server";

import { signIn } from "@/auth";
import postUserCreate from "@/http/post-user-create";
import { axiosInstance } from "@/lib/axios";
import type { SignInSchema, SignUpSchema } from "@/lib/schemas";
import { redirect } from "next/navigation";

/**
 * Cria um usuário.
 *
 * @param data Dados do usuário.
 * @throws {BaseError} Se ocorrer um erro de validação.
 */
export async function register(data: SignUpSchema): Promise<never> {
	const { email, password, name, phone_number } = data;
	postUserCreate(
		{ email, password, name, phone_number: `+55${phone_number}` },
		axiosInstance,
	);
	return redirect("/login");
}

/**
 * Loga um usuário.
 *
 * @param data Credenciais do usuário.
 * @throws {CredentialsSignin} Se as credenciais estiverem incorretas.
 */
export async function login(data: SignInSchema): Promise<void> {
	await signIn("credentials", { ...data, redirectTo: "/dashboard" });
}
