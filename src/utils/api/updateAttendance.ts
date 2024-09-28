"use server";

import Training from "@/models/Training";

export default async function updateAttendance(
    userId: string,
    trainingId: string,
    push: boolean,
) {
    if (userId === "66b3e5534bbc76f3225afb05") {
        //host
        return "Z host účtu se nelze přihlašovat na tréninky";
    }

    const training = await Training.findById(trainingId);
    if (push && training.attendance.length >= training.courts * 4) {
        return "Trénink je plný. Zkus kontaktovat Standu, jestli jsou volné další kurty.";
    }

    await training.updateOne(
        push
            ? { $addToSet: { attendance: userId } }
            : { $pull: { attendance: userId } },
    );

    return "";
}
