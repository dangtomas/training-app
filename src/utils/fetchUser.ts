import { getCookie } from "cookies-next";

export default async function fetchUser(id: string) {
    const response = await fetch(`/api/users/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getCookie("token")}`,
        },
    });
    if (response.status != 200) {
        throw new Error("Failed to fetch data.");
    }

    const user = await response.json();
    return user;
}
