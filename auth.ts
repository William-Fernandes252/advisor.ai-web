import NextAuth, { type DefaultSession, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { axiosInstance } from "@/lib/axios";
import tokenObtainPair from "@/http/token-obtain-pair";
import jwt from "jsonwebtoken";
import { signInSchema } from "./lib/schemas";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface JWT {
		token_type: string;
		exp: number;
		iat: number;
		jti: string;
		id: number;
		phone_number: string;
		email: string;
		name: string;
		groups: string[];
	}
	interface Session {
		user: {
			date_joined: string;
			groups: string[];
			phone_number: string;
			_jwt: {
				exp: number;
				iat: number;
				sub: string;
				access: string;
				refresh: string;
			};
		} & Omit<DefaultSession["user"], "image">;
		jwt: DefaultJWT;
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const { email, password } = signInSchema.parse(credentials);

					const { access, refresh } = await tokenObtainPair(
						{ email, password },
						axiosInstance,
					);

					const payload = jwt.verify(
						access,
						process.env.AUTH_SECRET as string,
					) as jwt.JwtPayload;

					return {
						email: payload.email,
						name: payload.name,
						id: payload.id,
						date_joined: payload.date_joined,
						groups: payload.groups,
						phone_number: payload.phone_number,
						_jwt: {
							exp: payload.exp,
							iat: payload.iat,
							sub: payload.sub,
							access,
							refresh,
						},
					};
				} catch (error) {
					if (error instanceof ZodError) {
						return null;
					}
					throw error;
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token }) => {
			return token;
		},
		session: async ({ session, token }) => {
			if (token) {
				session.jwt = token;
			}
			return session;
		},
	},
});
