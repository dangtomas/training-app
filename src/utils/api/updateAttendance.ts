"use server";

import Training from "@/models/Training";

export default async function updateAttendance(
    attendance: string[],
    trainingId: string,
) {
    await Training.findByIdAndUpdate(
        { _id: trainingId },
        { attendance },
        { new: true },
    );
}
