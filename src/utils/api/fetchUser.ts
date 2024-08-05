"use server";

import User from "@/models/User";

export default async function fetchUser(id: string) {
    if (id.startsWith("HOST")) {
        return {
            _id: id,
            name: id.split("-", 2)[1],
            username: id.split("-", 2)[1].replace(" ", "").toLowerCase(),
            profilePicSrc:
                "https://res.cloudinary.com/dynjmtw8a/image/upload/v1720293279/ybsesmgjvxmvt4wmglvy.jpg",
        };
    }

    const user = await User.findById(id);
    return {
        _id: user._id.toString(),
        name: user.name,
        username: user.username,
        profilePicSrc: user.profilePicSrc,
    };
}
