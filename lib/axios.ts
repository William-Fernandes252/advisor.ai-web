import { auth } from "@/auth";
import axios from "axios";

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
