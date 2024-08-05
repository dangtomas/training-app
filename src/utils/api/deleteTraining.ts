"use server";

import User from "@/models/User";
import Training from "@/models/Training";
import { cookies } from "next/headers";

export default async function deleteTraining(trainingId: string) {
    const userId = cookies().get("id")?.value;
    const user = await User.findById(userId);

    if (!user.isAdmin) {
        alert("Nepovedlo se odstranit trénink 😔");
        throw new Error("Unauthorized delete.");
    }

    await Training.findByIdAndDelete(trainingId);
}
