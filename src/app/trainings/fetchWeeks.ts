import { getCookie } from "cookies-next";

export default async function fetchWeeks() {
    const response = await fetch("/api/weeks", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getCookie("token")}`,
        },
    });

    if (response.status !== 200) {
        throw new Error();
    }
    let weeks = await response.json();
    return weeks;
}
