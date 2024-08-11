import * as jose from "jose";

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

export async function APIauthenticate(
    authHeader: string | null,
    method: string,
) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return Response.json({ error: "Invalid token." }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        const { payload } = await jose.jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET),
        );

        if (method !== "GET" && !payload.isAdmin) {
            return Response.json(
                { error: "Unauthorized operation." },
                { status: 401 },
            );
        }
    } catch (err) {
        console.log(err);
        return Response.json({ error: "Invalid token." }, { status: 401 });
    }
}
