import Week from "@/types/Week";
import { getCookie } from "cookies-next";

export default async function fetchTrainings(currentWeek: Week | undefined) {
    if (!currentWeek) {
        return;
    }
    const from = currentWeek.from.substring(0, 10);
    const to = currentWeek.to.substring(0, 10);
    const queryString = `?from=${from}&to=${to}`;
    const response = await fetch(`/api/trainings${queryString}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getCookie("token")}`,
        },
    });
    if (response.status !== 200) {
        throw new Error();
    }
    let data = await response.json();
    return data;
}
