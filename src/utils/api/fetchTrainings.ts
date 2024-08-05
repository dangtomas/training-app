"use server";

import Training from "@/models/Training";

export default async function fetchTrainings(from: Date, to: Date) {
    const trainings = await Training.find({
        date: {
            $gte: from.toISOString(),
            $lte: to.toISOString(),
        },
    }).sort("date");
    return JSON.parse(JSON.stringify(trainings));
}
