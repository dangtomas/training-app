import { headers } from "next/headers";
import { NextRequest } from "next/server";
import authenticate from "./app/api/authentication";

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    if (path !== "/api/login" && path.startsWith("/api")) {
        return authenticate(headers().get("authorization"));
    }
}



export const config = {
    matcher: "/api/:path+"
}