"use server";
import Week from "@/models/Week";
import { redirect } from "next/navigation";
import { getTimezoneOffset } from "../dateHelper";
import { cookies } from "next/headers";
import User from "@/models/User";

export default async function modifyWeeks(formData: FormData) {
    const userId = cookies().get("id")?.value;
    const user = await User.findById(userId);

    if (!user.isAdmin) {
        alert("Nepovedlo se upravit týdny 😔");
        throw new Error("Unauthorized delete.");
    }

    const fromDate = new Date(formData.get("from") + "T00:00:00Z");
    const toDate = new Date(formData.get("to") + "T23:59:59Z");
    let weekData = {
        name: formData.get("name"),
        from: new Date(
            fromDate.getTime() - getTimezoneOffset("Europe/Prague") * 60 * 1000,
        ),
        to: new Date(
            toDate.getTime() - getTimezoneOffset("Europe/Prague") * 60 * 1000,
        ),
    };

    const weekId = formData.get("weekId");
    if (weekId) {
        await Week.findByIdAndUpdate(weekId, weekData);
    } else {
        await Week.create(weekData);
    }
    redirect("/weeks");
}
