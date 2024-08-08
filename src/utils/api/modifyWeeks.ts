"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Week from "@/models/Week";
import User from "@/models/User";
import Training from "@/models/Training";
import { getTimezoneOffset } from "../dateHelper";
import { createTrainingWeek } from "../createTrainingWeek";

export default async function modifyWeeks(formData: FormData) {
    const userId = cookies().get("id")?.value;
    const user = await User.findById(userId);

    if (!user.isAdmin) {
        throw new Error("Unauthorized operation.");
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

    const addTrainings = formData.get("addTrainings")?.toString();
    if (addTrainings !== "none") {
        createTrainingWeek(weekData.from, addTrainings!).forEach(
            async (trainingData) => {
                await Training.create(trainingData);
            },
        );
    }

    const weekId = formData.get("weekId");
    if (weekId) {
        await Week.findByIdAndUpdate(weekId, weekData);
    } else {
        await Week.create(weekData);
    }
    redirect("/weeks");
}
