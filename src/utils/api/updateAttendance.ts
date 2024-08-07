"use server";

import Training from "@/models/Training";

export default async function updateAttendance(
    userId: string,
    trainingId: string,
    push: boolean,
) {
    if (userId === "66b3e5534bbc76f3225afb05") {
        //host
        return;
    }

    await Training.findByIdAndUpdate(
        trainingId,
        push
            ? { $push: { attendance: userId } }
            : { $pull: { attendance: userId } },
        { new: true },
    );
}
