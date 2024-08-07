"use server";

import User from "@/models/User";
import Week from "@/models/Week";
import { cookies } from "next/headers";

export default async function deleteWeek(weekId: string) {
    const userId = cookies().get("id")?.value;
    const user = await User.findById(userId);

    if (!user.isAdmin) {
        throw new Error("Unauthorized operation.");
    }

    await Week.findByIdAndDelete(weekId);
}
