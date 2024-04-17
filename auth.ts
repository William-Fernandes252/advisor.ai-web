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
	}
	interface Session {
		user: {
			date_joined: string;
			groups: string[];
			phone_number: string;
			jwt: string;
		} & Omit<DefaultSession["user"], "image">;
		jwt: string;
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
				return { ...token, jwt: user.jwt };
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (typeof token?.jwt === "string") {
				session.jwt = token.jwt;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
});
