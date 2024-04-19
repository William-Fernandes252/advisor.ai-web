import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
	if (!request.auth) {
		const url = request.nextUrl.clone();
		url.pathname = "/login";
		return NextResponse.rewrite(url);
	}
});

export const config = {
	matcher: ["/dashboard"],
};
