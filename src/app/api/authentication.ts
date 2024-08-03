import * as jose from "jose";
import { NextResponse } from "next/server";

export async function isValidToken(token: string) {
    try {
        await jose.jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET),
        );
        return true;
    } catch (err) {
        return false;
    }
}

export async function APIauthenticate(authHeader: string | null) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return Response.json({ error: "Invalid token." }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        const { payload } = await jose.jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET),
        );

        const res = NextResponse.next();
        if (payload.isAdmin) {
            res.headers.set("isAdmin", "true");
        }
        console.log(payload);
        return res;
    } catch (err) {
        console.log(err);
        return Response.json({ error: "Invalid token." }, { status: 401 });
    }
}
