"use server";

import Training from "@/models/Training";
import User from "@/models/User";
import { cookies } from "next/headers";

export default async function editAttendance(
    playerId: string,
    trainingId: string,
    push: boolean,
) {
    const userId = cookies().get("id")?.value;
    const user = await User.findById(userId);
    if (!user.isAdmin) {
        return;
    }

    await Training.findByIdAndUpdate(
        trainingId,
        push
            ? { $addToSet: { attendance: playerId } }
            : { $pull: { attendance: playerId } },
    );
}
