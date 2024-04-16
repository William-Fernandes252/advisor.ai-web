import { auth } from "@/auth";
import axios from "axios";
import { cookies } from "next/headers";

export const axiosInstance = axios.create({
	baseURL: process.env.API_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
	const session = await auth();
	if (session) {
		const token = session.jwt;
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
