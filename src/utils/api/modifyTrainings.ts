"use server";
import Training from "@/models/Training";
import { redirect } from "next/navigation";

export default async function modifyTrainings(formData: FormData) {
    let trainingData = {
        activity: formData.get("activity"),
        duration: formData.get("duration"),
        date: formData.get("date"),
        courts: formData.get("courts"),
        courtPrice: formData.get("courtPrice"),
        isTrainer: formData.get("isTrainer"),
        info: formData.get("info"),
    };

    const trainingId = formData.get("trainingId");
    if (trainingId) {
        await Training.findByIdAndUpdate(trainingId, trainingData);
    } else {
        await Training.create(trainingData);
    }
    redirect("/trainings");
}
