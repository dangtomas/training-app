"use server";

import Training from "@/models/Training";

export default async function fetchTraining(id: string) {
    const training = await Training.findById(id);
    return JSON.parse(JSON.stringify(training));
}
