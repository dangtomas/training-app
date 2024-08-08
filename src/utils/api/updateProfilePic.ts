"use server";
import User from "@/models/User";

export default async function updateProfilePic(
    id: string,
    profilePicSrc: string,
) {
    if (id === "66b3e5534bbc76f3225afb05") {
        //host
        throw new Error("Unauthorized operation.");
    }

    await User.findByIdAndUpdate(id, { profilePicSrc });
}
