"use server";

import User from "@/models/User";
import fetchUser from "./fetchUser";
import Training from "@/types/Training";

export default async function fetchMembersWithHosts(trainings: Training[]) {
    let users = await User.find({}).sort("name");
    await addHosts(trainings, users);
    return JSON.parse(JSON.stringify(users));
}

async function addHosts(trainings: Training[], users: any) {
    trainings.forEach((t) =>
        t.attendance.forEach(async (id) => {
            if (id.startsWith("HOST")) {
                const user = await fetchUser(id);
                users.push(user);
            }
        }),
    );
    return users;
}
