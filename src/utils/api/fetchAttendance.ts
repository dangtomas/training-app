"use server";

import Training from "@/models/Training";

export default async function fetchAttendance(id: string) {
    const training = await Training.findById(id);
    return training.attendance;
}
