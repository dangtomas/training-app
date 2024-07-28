import * as jose from "jose";
import { NextResponse } from "next/server";

async function authenticate(authHeader: string | null) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return Response.json({ error: "Invalid token." }, 
                             { status: 401});
    }

    const token = authHeader.split(" ")[1];

    try {
        const { payload } = await jose.jwtVerify(
            token, 
            new TextEncoder().encode(process.env.JWT_SECRET)
        );

        const res = NextResponse.next();
        if (payload.isAdmin) {
            res.headers.set("isAdmin", "true");
        }
        return res;

    } catch(err) {
        return Response.json({ error: "Invalid token." }, 
                             { status: 401});
    }
}

export default authenticate;