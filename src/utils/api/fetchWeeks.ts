"use server";

import Week from "@/models/Week";

export default async function fetchWeeks() {
    const weeks = await Week.find({}).sort("-from");
    return JSON.parse(JSON.stringify(weeks));
}
