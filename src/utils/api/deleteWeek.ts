"use server";

import User from "@/models/User";
import Week from "@/models/Week";
import { cookies } from "next/headers";

export default async function deleteTraining(weekId: string) {
    const userId = cookies().get("id")?.value;
    const user = await User.findById(userId);

    if (!user.isAdmin) {
        alert("Nepovedlo se odstranit trénink 😔");
        throw new Error("Unauthorized delete.");
    }

    await Week.findByIdAndDelete(weekId);
}
