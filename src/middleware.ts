import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import isValidToken from "./app/api/authentication";

export function middleware() {
    const token = cookies().get("token")?.value;

    if (!token || !isValidToken(token)) {
        return NextResponse.redirect("/login");
    }
}

export const config = {
    matcher: ["/api/:path*", "/", "/members", "/prices"],
};
