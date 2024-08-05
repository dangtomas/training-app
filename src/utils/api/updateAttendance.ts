"use server";

import Training from "@/models/Training";

export default async function updateAttendance(
    userId: string,
    trainingId: string,
    push: boolean,
) {
    await Training.findByIdAndUpdate(
        trainingId,
        push
            ? { $push: { attendance: userId } }
            : { $pull: { attendance: userId } },
        { new: true },
    );
}
