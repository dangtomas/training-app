"use server";
import Week from "@/models/Week";
import { redirect } from "next/navigation";

export default async function modifyWeeks(formData: FormData) {
    const fromDate = new Date(formData.get("from") + "T00:00:00Z");
    const toDate = new Date(formData.get("to") + "T23:59:59Z");
    console.log(new Date().getTimezoneOffset());
    let weekData = {
        name: formData.get("name"),
        from: new Date(
            fromDate.getTime() + new Date().getTimezoneOffset() * 60 * 1000,
        ),
        to: new Date(
            toDate.getTime() + new Date().getTimezoneOffset() * 60 * 1000,
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
