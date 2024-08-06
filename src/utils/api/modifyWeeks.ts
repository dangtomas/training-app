"use server";
import Week from "@/models/Week";
import { redirect } from "next/navigation";

export default async function modifyWeeks(formData: FormData) {
    const fromDateString = formData.get("from") + "T00:00:00";
    const toDateString = formData.get("to") + "T23:59:59";
    console.log(fromDateString);
    console.log(toDateString);
    let weekData = {
        name: formData.get("name"),
        from: new Date(fromDateString),
        to: new Date(toDateString),
    };

    const weekId = formData.get("weekId");
    if (weekId) {
        await Week.findByIdAndUpdate(weekId, weekData);
    } else {
        await Week.create(weekData);
    }
    redirect("/weeks");
}
