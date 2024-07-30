import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import isValidToken from "./app/api/authentication";

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = cookies().get("token")?.value;

    if (!token || !isValidToken(token)) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
}

export const config = {
    matcher: ["/api/users/:id*", "/api/trainings/:id*", "/members", "/prices"],
};
