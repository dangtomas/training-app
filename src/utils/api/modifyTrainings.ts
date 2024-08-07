"use server";
import Training from "@/models/Training";
import { redirect } from "next/navigation";
import { getTimezoneOffset } from "../dateHelper";

export default async function modifyTrainings(formData: FormData) {
    let trainingData = {
        activity: formData.get("activity"),
        duration: formData.get("duration"),
        date: formData.get("date") + ":00Z",
        courts: formData.get("courts"),
        courtPrice: formData.get("courtPrice"),
        isTrainer: formData.get("isTrainer"),
        info: formData.get("info"),
    };

    const date = new Date(
        new Date(trainingData.date).getTime() -
            getTimezoneOffset("Europe/Prague") * 60 * 1000,
    );

    const trainingId = formData.get("trainingId");
    if (trainingId) {
        await Training.findByIdAndUpdate(trainingId, { ...trainingData, date });
    } else {
        await Training.create({ ...trainingData, date });
    }
    redirect("/trainings");
}
