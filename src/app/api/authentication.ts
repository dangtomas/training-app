import * as jose from "jose";

async function isValidToken(token: string) {
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

export default isValidToken;
