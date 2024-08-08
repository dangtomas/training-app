"use server";

import { cookies } from "next/headers";

export default async function deleteCookies() {
    cookies().delete("token");
    cookies().delete("id");
}
