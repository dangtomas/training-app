"use server";

import User from "@/models/User";
import fetchUser from "./fetchUser";
import Training from "@/types/Training";
import UserType from "@/types/User";

export default async function fetchMembers(
    trainings: Training[],
    hosts: boolean,
) {
    let users: UserType[] = await User.find({}).sort("name");
    users = users.filter((u) => {
        return (
            u._id.toString() !== "669e2e4da78779b9287aaafd" &&
            u._id.toString() !== "668d082fbb6894b643abeb6b" &&
            u._id.toString() !== "66b3e5534bbc76f3225afb05"
        );
    });
    if (hosts) {
        await addHosts(trainings, users);
    }
    return JSON.parse(JSON.stringify(users));
}

async function addHosts(trainings: Training[], users: UserType[]) {
    trainings.forEach((t) =>
        t.attendance.forEach(async (id) => {
            if (id.startsWith("HOST")) {
                const user = await fetchUser(id);
                if (!users.some((u) => u._id === user._id)) {
                    users.push(user);
                }
            }
        }),
    );
    return users;
}
