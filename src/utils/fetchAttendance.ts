import Training from "@/types/Training";
import { getCookie } from "cookies-next";

export default async function fetchAttendance(id: string) {
    const response = await fetch(`/api/trainings/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getCookie("token")}`,
        },
    });

    if (response.status !== 200) {
        throw new Error("Failed to fetch attendance.");
    }

    const data: Training = await response.json();
    return data.attendance;
}
