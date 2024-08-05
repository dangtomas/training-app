"use server";

import Week from "@/models/Week";
import dbConnect from "@/db/dbConnect";

dbConnect();

export default async function fetchWeeks() {
    const weeks = await Week.find({});
    return JSON.parse(JSON.stringify(weeks));
}
