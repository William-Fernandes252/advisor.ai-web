import postTokenObtainPair from "@/http/post-token-obtain-pair";
import { axiosInstance } from "@/lib/axios";
import jwt from "jsonwebtoken";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { UnauthorizedError } from "./errors/http";
import { signInSchema } from "./lib/schemas";

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
		jwt?: string;
		expires?: number;
	}
	interface Session extends DefaultSession {
		user: {
			date_joined: string;
			groups: string[];
			phone_number: string;
			name: string;
		} & Omit<DefaultSession["user"], "image">;
		jwt: string;
		id: string;
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

					const { access } = await postTokenObtainPair(
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
						jwt: access,
						expires: payload.exp,
					};
				} catch (error) {
					if (error instanceof ZodError || error instanceof UnauthorizedError) {
						return null;
					}
					throw error;
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				// @ts-ignore
				return { ...token, jwt: user.jwt, expires: user.expires, id: user.id };
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (typeof token?.jwt === "string" && token?.expires) {
				session = {
					...session,
					jwt: token.jwt,
					// @ts-ignore
					id: token.id,
					// @ts-ignore
					expires: new Date(token.expires),
				};
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
});
